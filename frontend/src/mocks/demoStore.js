import { DEMO_KEYWORDS } from "./data.js";

const STORAGE_KEY = "savior:portfolio-demo:v1";
const STATE_VERSION = 1;
const SESSION_TOKEN = "savior-portfolio-demo-session";

const configuredMode = String(import.meta.env?.VITE_API_MODE ?? "mock").toLowerCase();

export const isMockMode = configuredMode !== "real";

export const DEMO_PERSONAS = Object.freeze([
  Object.freeze({
    id: "job-seeker",
    label: "청년 구직자",
    name: "청년 구직자",
    title: "취업을 준비하는 1인 가구",
    description: "직무 교육, 구직 활동, 청년 주거 지원을 우선 추천합니다.",
    summary: "20대 · 구직 중 · 1인 가구",
    emoji: "🧑‍💻",
    accentColor: "#2563eb",
    tags: Object.freeze(["청년", "구직", "1인가구"]),
    profile: Object.freeze({
      userSeq: 9001,
      userId: "demo-job-seeker",
      username: "청년 구직자",
      profileImageUrl: "./blank-profile.png",
      providerType: "DEMO",
      roleType: "USER",
      ageRange: "3",
      male: 1,
      female: 0,
      birth: null,
      child: "2",
      userGroup: 11,
    }),
    character: Object.freeze({ child: "2", job: Object.freeze([1]), family: Object.freeze([2]) }),
    recommendationIds: Object.freeze([1001, 1014, 1002, 1003, 1004, 1015, 1013, 1012]),
    initialLikes: Object.freeze([1003, 1002]),
    initialUsed: Object.freeze([1001]),
  }),
  Object.freeze({
    id: "young-family",
    label: "영유아 양육 가정",
    name: "영유아 양육 가정",
    title: "돌봄이 필요한 맞벌이 가정",
    description: "출산·보육 급여와 아이돌봄 서비스를 우선 추천합니다.",
    summary: "30대 · 맞벌이 · 영유아 자녀",
    emoji: "👨‍👩‍👧",
    accentColor: "#7c3aed",
    tags: Object.freeze(["육아", "돌봄", "가족"]),
    profile: Object.freeze({
      userSeq: 9002,
      userId: "demo-young-family",
      username: "영유아 양육 가정",
      profileImageUrl: "./blank-profile.png",
      providerType: "DEMO",
      roleType: "USER",
      ageRange: "4",
      male: 0,
      female: 1,
      birth: null,
      child: "1",
      userGroup: 22,
    }),
    character: Object.freeze({ child: "1", job: Object.freeze([5]), family: Object.freeze([12]) }),
    recommendationIds: Object.freeze([1005, 1006, 1007, 1008, 1012, 1013, 1015, 1002]),
    initialLikes: Object.freeze([1005, 1007]),
    initialUsed: Object.freeze([1006, 1008]),
  }),
  Object.freeze({
    id: "senior-single",
    label: "시니어 1인 가구",
    name: "시니어 1인 가구",
    title: "생활 안전과 돌봄이 필요한 어르신",
    description: "노후 소득, 생활돌봄, 응급안전 서비스를 우선 추천합니다.",
    summary: "60대 이상 · 1인 가구 · 돌봄 관심",
    emoji: "🧓",
    accentColor: "#0f766e",
    tags: Object.freeze(["노인", "독거", "돌봄"]),
    profile: Object.freeze({
      userSeq: 9003,
      userId: "demo-senior-single",
      username: "시니어 1인 가구",
      profileImageUrl: "./blank-profile.png",
      providerType: "DEMO",
      roleType: "USER",
      ageRange: "5",
      male: 0,
      female: 1,
      birth: null,
      child: "2",
      userGroup: 33,
    }),
    character: Object.freeze({ child: "2", job: Object.freeze([5]), family: Object.freeze([2, 10]) }),
    recommendationIds: Object.freeze([1009, 1011, 1010, 1012, 1015, 1013, 1005, 1008]),
    initialLikes: Object.freeze([1009, 1011]),
    initialUsed: Object.freeze([1010]),
  }),
]);

let memoryState = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function makePersonaState(persona) {
  const character = clone(persona.character);
  const profile = {
    ...clone(persona.profile),
    selectfamilies: character.family.map((familyId, index) => ({
      selectFamilyId: index + 1,
      familyId,
    })),
    selecttargets: character.job.map((targetId, index) => ({
      selectTargetId: index + 1,
      targetId,
    })),
    likewelfares: [],
    usedwelfares: [],
  };

  return {
    profile,
    character,
    likes: [...persona.initialLikes],
    used: [...persona.initialUsed],
  };
}

function createInitialState() {
  const personas = Object.fromEntries(
    DEMO_PERSONAS.map((persona) => [persona.id, makePersonaState(persona)]),
  );

  return {
    version: STATE_VERSION,
    activePersonaId: DEMO_PERSONAS[0].id,
    personas,
    keywordCounts: Object.fromEntries(
      DEMO_KEYWORDS.map((keyword, index) => [keyword, 30 - index * 2]),
    ),
    viewIncrements: {},
    qnas: [],
  };
}

function normalizeState(candidate) {
  const defaults = createInitialState();
  if (!candidate || candidate.version !== STATE_VERSION) return defaults;

  const activePersonaExists = DEMO_PERSONAS.some(
    (persona) => persona.id === candidate.activePersonaId,
  );

  const personas = Object.fromEntries(
    DEMO_PERSONAS.map((persona) => {
      const fallback = defaults.personas[persona.id];
      const stored = candidate.personas?.[persona.id];

      return [
        persona.id,
        {
          profile: { ...fallback.profile, ...stored?.profile },
          character: { ...fallback.character, ...stored?.character },
          likes: Array.isArray(stored?.likes) ? stored.likes.map(Number) : fallback.likes,
          used: Array.isArray(stored?.used) ? stored.used.map(Number) : fallback.used,
        },
      ];
    }),
  );

  return {
    ...defaults,
    ...candidate,
    activePersonaId: activePersonaExists
      ? candidate.activePersonaId
      : defaults.activePersonaId,
    personas,
    keywordCounts: {
      ...defaults.keywordCounts,
      ...(candidate.keywordCounts ?? {}),
    },
    viewIncrements: candidate.viewIncrements ?? {},
    qnas: Array.isArray(candidate.qnas) ? candidate.qnas : [],
  };
}

function readState() {
  const storage = getStorage();
  if (!storage) {
    memoryState = normalizeState(memoryState);
    return memoryState;
  }

  try {
    return normalizeState(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return createInitialState();
  }
}

function emitChange(state) {
  if (typeof window === "undefined" || typeof window.CustomEvent !== "function") return;

  window.dispatchEvent(
    new window.CustomEvent("savior:demo-change", {
      detail: {
        activePersonaId: state.activePersonaId,
        persona: getPersonaById(state.activePersonaId),
      },
    }),
  );
}

function syncSessionAliases(state) {
  const storage = getStorage();
  if (!storage || !isMockMode) return;

  const current = state.personas[state.activePersonaId];
  storage.setItem("token", SESSION_TOKEN);
  storage.setItem("name", current.profile.username);
  storage.setItem("profile", current.profile.profileImageUrl || "./blank-profile.png");
}

function persistState(state, { notify = true } = {}) {
  const normalized = normalizeState(state);
  memoryState = normalized;

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // localStorage가 차단된 환경에서는 메모리 상태로 데모를 계속합니다.
    }
  }

  syncSessionAliases(normalized);
  if (notify) emitChange(normalized);
  return normalized;
}

function getPersonaById(personaId) {
  return DEMO_PERSONAS.find((persona) => persona.id === personaId);
}

/**
 * 저장된 데모 상태를 정규화하고 기존 로그인 분기에서 사용하는 세션 별칭을 준비한다.
 *
 * @returns {object|null} 복원된 데모 상태 또는 Real 모드의 null
 */
export function initializeDemoSession() {
  if (!isMockMode) return null;

  const state = persistState(readState(), { notify: false });
  return clone(state);
}

/**
 * 외부 코드가 내부 상태를 직접 변경하지 못하도록 현재 데모 상태의 복사본을 반환한다.
 *
 * @returns {object} 정규화된 데모 상태
 */
export function getDemoState() {
  const state = isMockMode ? persistState(readState(), { notify: false }) : readState();
  return clone(state);
}

/**
 * 데모 상태 변경을 한 곳에서 영속화하고 화면에 변경 이벤트를 전파한다.
 *
 * @param {(draft: object) => object|void} updater 변경할 상태 초안을 받는 함수
 * @returns {object} 저장된 최신 상태의 복사본
 */
export function updateDemoState(updater) {
  const draft = getDemoState();
  const updated = updater(draft) ?? draft;
  return clone(persistState(updated));
}

export function getActivePersona() {
  const state = getDemoState();
  return getPersonaById(state.activePersonaId) ?? DEMO_PERSONAS[0];
}

/**
 * 활성 페르소나를 바꾸고 해당 프로필·추천 상태가 화면에 반영되도록 저장한다.
 *
 * @param {string|{id: string}} personaOrId 페르소나 ID 또는 페르소나 객체
 * @returns {object} 선택된 페르소나
 */
export function setActivePersona(personaOrId) {
  const personaId =
    typeof personaOrId === "string" ? personaOrId : personaOrId?.id;
  const persona = getPersonaById(personaId);

  if (!persona) {
    throw new RangeError(`알 수 없는 데모 페르소나입니다: ${String(personaId)}`);
  }

  updateDemoState((state) => {
    state.activePersonaId = persona.id;
  });

  return persona;
}

export function resetDemoState() {
  const storage = getStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
  memoryState = null;

  const state = persistState(createInitialState());
  return clone(state);
}

export function getActivePersonaState() {
  const state = getDemoState();
  return clone(state.personas[state.activePersonaId]);
}
