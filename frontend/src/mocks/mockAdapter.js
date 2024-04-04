import { AxiosError } from "axios";

import { DEMO_KEYWORDS, DEMO_WELFARES, findDemoWelfare } from "./data.js";
import {
  getDemoState,
  resetDemoState,
  updateDemoState,
} from "./demoStore.js";

const delayValue = Number(import.meta.env?.VITE_MOCK_DELAY_MS ?? 40);
const MOCK_DELAY_MS = Number.isFinite(delayValue)
  ? Math.min(Math.max(delayValue, 0), 500)
  : 40;

const PURPOSE_LIMIT = 6;

function wait(ms) {
  if (ms === 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function apiSuccess(name, value) {
  return {
    header: { code: 200, message: "SUCCESS" },
    body: { [name]: value },
  };
}

function parseRequestData(data) {
  if (data == null || typeof data === "object") return data ?? {};

  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function parseUrl(rawUrl = "/") {
  const normalized = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return new URL(normalized, "https://savior.demo");
}

function getActiveContext(state) {
  return {
    personaId: state.activePersonaId,
    personaState: state.personas[state.activePersonaId],
  };
}

function getViewCount(welfare, state) {
  return welfare.welfare_view + Number(state.viewIncrements[welfare.welfareId] ?? 0);
}

function toWelfareDto(welfare, state) {
  if (!welfare) return null;
  const { demoTags: _demoTags, ...dto } = welfare;

  return {
    ...dto,
    welfare_view: getViewCount(welfare, state),
  };
}

function getWelfareList(ids, state) {
  return ids
    .map(findDemoWelfare)
    .filter(Boolean)
    .map((welfare) => toWelfareDto(welfare, state));
}

function getRecommendedWelfares(state) {
  const { personaId, personaState } = getActiveContext(state);
  const personaDefaults = {
    "job-seeker": [1001, 1014, 1002, 1003, 1004, 1015, 1013, 1012],
    "young-family": [1005, 1006, 1007, 1008, 1012, 1013, 1015, 1002],
    "senior-single": [1009, 1011, 1010, 1012, 1015, 1013, 1005, 1008],
  };

  let ids = [...(personaDefaults[personaId] ?? personaDefaults["job-seeker"])];

  // 프로필 화면에서 필터를 바꾼 경우에도 추천 결과가 눈에 띄게 반응합니다.
  if (personaState.character.child === "1") {
    ids = [1005, 1006, 1007, 1008, ...ids];
  }
  if (personaState.character.family.includes(10)) {
    ids = [1009, 1011, 1010, ...ids];
  }
  if (personaState.character.family.includes(0)) {
    ids = [1004, 1015, 1003, ...ids];
  }
  if (personaState.character.job.some((jobId) => [0, 1, 2].includes(jobId))) {
    ids = [1001, 1014, 1002, ...ids];
  }

  return getWelfareList([...new Set(ids)].slice(0, 10), state);
}

function getPopularWelfares(state) {
  return [...DEMO_WELFARES]
    .sort((left, right) => getViewCount(right, state) - getViewCount(left, state))
    .slice(0, 10)
    .map((welfare) => toWelfareDto(welfare, state));
}

function getPurposeCounts(state) {
  const counts = {};

  for (const welfare of getRecommendedWelfares(state)) {
    for (const purpose of welfare.welfare_service_type.split("||")) {
      counts[purpose] = (counts[purpose] ?? 0) + 1;
    }
  }

  return Object.fromEntries(Object.entries(counts).slice(0, PURPOSE_LIMIT));
}

function getGroupPopular(state) {
  return getRecommendedWelfares(state)
    .sort((left, right) => right.welfare_view - left.welfare_view)
    .slice(0, 6)
    .map((welfare) => ({
      welfare_id: welfare.welfareId,
      welfare_service_name: welfare.welfare_service_name,
      welfare_view: welfare.welfare_view,
      welfare_service_content: welfare.welfare_service_content,
    }));
}

function getKeywordList(state) {
  const keywords = Object.entries(state.keywordCounts)
    .sort(([, leftCount], [, rightCount]) => rightCount - leftCount)
    .map(([keywordName, keywordCnt], index) => ({
      keywordId: index + 1,
      keywordName,
      keywordCnt,
    }));

  return keywords.length > 0
    ? keywords
    : DEMO_KEYWORDS.map((keywordName, index) => ({
        keywordId: index + 1,
        keywordName,
        keywordCnt: 1,
      }));
}

function searchWelfares(keyword, state) {
  const query = keyword.trim().toLocaleLowerCase("ko-KR");
  if (!query) return [];

  const result = DEMO_WELFARES.filter((welfare) => {
    const searchableText = [
      welfare.welfare_service_name,
      welfare.welfare_service_content,
      welfare.welfare_target_detail,
      welfare.welfare_service_type,
      ...welfare.demoTags,
    ]
      .join(" ")
      .toLocaleLowerCase("ko-KR");

    return searchableText.includes(query);
  })
    .sort((left, right) => getViewCount(right, state) - getViewCount(left, state))
    .map((welfare) => [
      welfare.welfareId,
      welfare.welfare_service_name,
      getViewCount(welfare, state),
    ]);

  if (result.length > 0) {
    updateDemoState((nextState) => {
      nextState.keywordCounts[keyword] =
        Number(nextState.keywordCounts[keyword] ?? 0) + 1;
    });
  }

  return result;
}

function getRelatedWelfares(welfareId, state) {
  const source = findDemoWelfare(welfareId);
  if (!source) return [];

  return DEMO_WELFARES.filter((candidate) => candidate.welfareId !== source.welfareId)
    .map((candidate) => ({
      candidate,
      score: candidate.demoTags.filter((tag) => source.demoTags.includes(tag)).length,
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        getViewCount(right.candidate, state) - getViewCount(left.candidate, state),
    )
    .slice(0, 6)
    .map(({ candidate }) => [
      candidate.welfareId,
      candidate.welfare_service_name,
      candidate.welfare_service_content,
    ]);
}

function updateProfile(payload) {
  return updateDemoState((state) => {
    const { personaState } = getActiveContext(state);
    if (payload.age != null) personaState.profile.ageRange = String(payload.age);

    if (payload.gender === "male") {
      personaState.profile.male = 1;
      personaState.profile.female = 0;
    } else if (payload.gender === "female") {
      personaState.profile.male = 0;
      personaState.profile.female = 1;
    }
  });
}

function updateCharacter(payload) {
  return updateDemoState((state) => {
    const { personaState } = getActiveContext(state);
    const child = payload.child == null ? "2" : String(payload.child);
    const job = Array.isArray(payload.job) ? payload.job.map(Number) : [];
    const family = Array.isArray(payload.family) ? payload.family.map(Number) : [];

    personaState.character = { child, job, family };
    personaState.profile.child = child;
    personaState.profile.selecttargets = job.map((targetId, index) => ({
      selectTargetId: index + 1,
      targetId,
    }));
    personaState.profile.selectfamilies = family.map((familyId, index) => ({
      selectFamilyId: index + 1,
      familyId,
    }));
  });
}

function updateSavedWelfare(kind, welfareId, shouldSave) {
  return updateDemoState((state) => {
    const { personaState } = getActiveContext(state);
    const numericId = Number(welfareId);
    const current = new Set(personaState[kind].map(Number));

    if (shouldSave && findDemoWelfare(numericId)) current.add(numericId);
    if (!shouldSave) current.delete(numericId);
    personaState[kind] = [...current];
  });
}

function currentDateParts() {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()];
}

function handleQna(method, path, query, payload, state) {
  if (path === "/api/qna/mine" && method === "get") {
    return apiSuccess("success", state.qnas);
  }

  if (path === "/api/qna/mine" && method === "post") {
    let created;
    updateDemoState((nextState) => {
      created = {
        id: Date.now(),
        title: payload.title ?? "문의",
        content: payload.content ?? "",
        qna_created_at: currentDateParts(),
        comments: [],
      };
      nextState.qnas.push(created);
    });
    return apiSuccess("success", created);
  }

  const qnaMatch = path.match(/^\/api\/qna\/mine\/(\d+)$/);
  if (qnaMatch) {
    const qnaId = Number(qnaMatch[1]);
    const qna = state.qnas.find((item) => Number(item.id) === qnaId);

    if (method === "get") return qna ? apiSuccess("success", qna) : null;
    if (method === "delete") {
      updateDemoState((nextState) => {
        nextState.qnas = nextState.qnas.filter((item) => Number(item.id) !== qnaId);
      });
      return apiSuccess("success", "success");
    }
    if (method === "patch" && qna) {
      updateDemoState((nextState) => {
        const target = nextState.qnas.find((item) => Number(item.id) === qnaId);
        Object.assign(target, {
          title: payload.title ?? target.title,
          content: payload.content ?? target.content,
        });
      });
      return apiSuccess("success", "success");
    }
  }

  const createCommentMatch = path.match(/^\/api\/comment\/(\d+)$/);
  if (createCommentMatch && method === "post") {
    const qnaId = Number(createCommentMatch[1]);
    const content = query.get("content") ?? payload.comment_content ?? "";
    let created;

    updateDemoState((nextState) => {
      const qna = nextState.qnas.find((item) => Number(item.id) === qnaId);
      if (!qna) return;
      created = {
        comment_id: Date.now(),
        comment_content: content,
        name: "데모 사용자",
        comment_created_at: currentDateParts(),
        comment_updated_at: currentDateParts(),
      };
      qna.comments.push(created);
    });
    return created ? apiSuccess("success", created) : null;
  }

  if (createCommentMatch && ["patch", "delete"].includes(method)) {
    const commentId = Number(createCommentMatch[1]);
    updateDemoState((nextState) => {
      for (const qna of nextState.qnas) {
        const comment = qna.comments.find(
          (item) => Number(item.comment_id) === commentId,
        );
        if (comment && method === "patch") {
          comment.comment_content =
            query.get("content") ?? payload.comment_content ?? comment.comment_content;
          comment.comment_updated_at = currentDateParts();
        }
        if (method === "delete") {
          qna.comments = qna.comments.filter(
            (item) => Number(item.comment_id) !== commentId,
          );
        }
      }
    });
    return apiSuccess("success", "success");
  }

  return undefined;
}

function handleRequest(config) {
  const method = String(config.method ?? "get").toLowerCase();
  const url = parseUrl(config.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  const payload = parseRequestData(config.data);
  let state = getDemoState();
  let active = getActiveContext(state);

  if (method === "get" && ["/api/users", "/api/users/profile"].includes(path)) {
    return apiSuccess("user", active.personaState.profile);
  }

  if (path === "/api/users/update/profile" && method === "post") {
    updateProfile(payload);
    return apiSuccess(
      "Response",
      `연령대: ${payload.age ?? "미설정"} 성별: ${payload.gender ?? "미설정"} 입력`,
    );
  }

  if (path === "/api/users/update/char") {
    if (method === "get") {
      return apiSuccess("UserCharacter", active.personaState.character);
    }
    if (method === "post") {
      updateCharacter(payload);
      return apiSuccess("성공", "성공");
    }
  }

  if (path === "/api/users/like" && method === "get") {
    return apiSuccess("likeList", getWelfareList(active.personaState.likes, state));
  }

  if (path === "/api/users/used" && method === "get") {
    return apiSuccess("usedWelfareList", getWelfareList(active.personaState.used, state));
  }

  const savedMatch = path.match(/^\/api\/users\/(like|used)\/(\d+)$/);
  if (savedMatch && ["put", "delete"].includes(method)) {
    updateSavedWelfare(savedMatch[1] === "like" ? "likes" : "used", savedMatch[2], method === "put");
    return apiSuccess("save", "success");
  }

  if (path === "/api/users/delete" && method === "delete") {
    const username = active.personaState.profile.username;
    resetDemoState();
    return apiSuccess("Delete", `${username} 데모 상태 초기화 완료`);
  }

  if (path === "/api/welfare/recommend" && method === "get") {
    return apiSuccess("welfare", getRecommendedWelfares(state));
  }

  if (path === "/api/welfare/recommend/purpose" && method === "get") {
    return getPurposeCounts(state);
  }

  if (path === "/api/welfare/recommend/grouppopular" && method === "get") {
    return getGroupPopular(state);
  }

  if (path === "/api/welfare/popular" && method === "get") {
    return apiSuccess("welfare", getPopularWelfares(state));
  }

  if (path === "/api/welfare/keyword" && method === "get") {
    return apiSuccess("keywords", getKeywordList(state));
  }

  const searchMatch = path.match(/^\/api\/welfare\/search\/(.+)$/);
  if (searchMatch && method === "get") {
    return searchWelfares(decodeURIComponent(searchMatch[1]), state);
  }

  const relatedMatch = path.match(/^\/api\/welfare\/(\d+)\/recommend$/);
  if (relatedMatch && method === "get") {
    return getRelatedWelfares(relatedMatch[1], state);
  }

  const detailMatch = path.match(/^\/api\/welfare\/(\d+)$/);
  if (detailMatch && method === "get") {
    const welfare = findDemoWelfare(detailMatch[1]);
    if (!welfare) return null;

    state = updateDemoState((nextState) => {
      const current = Number(nextState.viewIncrements[welfare.welfareId] ?? 0);
      nextState.viewIncrements[welfare.welfareId] = current + 1;
    });
    return apiSuccess("welfare", toWelfareDto(welfare, state));
  }

  const djangoMatch = path.match(
    /^\/(?:user_insert\/dbscan|user\/insert_dbscan)\/(\d+)$/,
  );
  if (djangoMatch && method === "get") {
    return {
      status: "ok",
      demo: true,
      userSeq: Number(djangoMatch[1]),
      message: "Mock 모드에서는 추천 프로필이 브라우저에서 즉시 반영됩니다.",
    };
  }

  const qnaResponse = handleQna(method, path, url.searchParams, payload, state);
  if (qnaResponse !== undefined) return qnaResponse;

  return null;
}

function makeResponse(config, data, status = 200) {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : "Not Found",
    headers: { "content-type": "application/json" },
    config,
    request: null,
  };
}

/**
 * 기존 Spring Boot·Django 요청 계약을 로컬 데이터로 처리하는 Axios adapter다.
 * 등록하지 않은 경로는 조용히 성공시키지 않고 404 AxiosError로 반환한다.
 *
 * @param {import("axios").InternalAxiosRequestConfig} config Axios 요청 설정
 * @returns {Promise<import("axios").AxiosResponse>} Mock API 응답
 */
export async function mockAdapter(config) {
  await wait(MOCK_DELAY_MS);
  const data = handleRequest(config);

  if (data !== null) return makeResponse(config, data);

  const response = makeResponse(
    config,
    {
      header: { code: 404, message: "MOCK ENDPOINT NOT FOUND" },
      body: null,
    },
    404,
  );

  throw new AxiosError(
    `Mock API 경로를 찾을 수 없습니다: ${String(config.method).toUpperCase()} ${config.url}`,
    AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    response,
  );
}

export default mockAdapter;
