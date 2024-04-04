import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";

import axios from "axios";

import { resetDemoState, setActivePersona } from "./demoStore.js";
import mockAdapter from "./mockAdapter.js";

const client = axios.create({ adapter: mockAdapter });

beforeEach(() => {
  resetDemoState();
});

test("기본 데모 프로필과 추천 목록을 반환한다", async () => {
  const profileResponse = await client.get("/api/users/profile");
  const recommendationResponse = await client.get("/api/welfare/recommend");

  assert.equal(profileResponse.data.body.user.username, "청년 구직자");
  assert.ok(recommendationResponse.data.body.welfare.length >= 6);
});

test("페르소나를 바꾸면 프로필과 추천이 함께 바뀐다", async () => {
  setActivePersona("young-family");

  const profileResponse = await client.get("/api/users/profile");
  const recommendationResponse = await client.get("/api/welfare/recommend");

  assert.equal(profileResponse.data.body.user.username, "영유아 양육 가정");
  assert.equal(
    recommendationResponse.data.body.welfare[0].welfare_service_name,
    "아이돌봄 이용 지원",
  );
});

test("검색 결과는 기존 화면이 사용하는 tuple 계약을 지킨다", async () => {
  const response = await client.get(
    `/api/welfare/search/${encodeURIComponent("청년")}`,
  );

  assert.ok(response.data.length > 0);
  assert.equal(response.data[0].length, 3);
  assert.equal(typeof response.data[0][0], "number");
});

test("찜 상태는 저장과 조회 요청 사이에서 유지된다", async () => {
  await client.put("/api/users/like/1001");
  const savedResponse = await client.get("/api/users/like");
  assert.ok(
    savedResponse.data.body.likeList.some(
      (welfare) => welfare.welfareId === 1001,
    ),
  );

  await client.delete("/api/users/like/1001");
  const removedResponse = await client.get("/api/users/like");
  assert.ok(
    removedResponse.data.body.likeList.every(
      (welfare) => welfare.welfareId !== 1001,
    ),
  );
});

test("등록되지 않은 Mock 경로는 404로 실패한다", async () => {
  await assert.rejects(
    () => client.get("/api/not-implemented"),
    (error) => error.response?.status === 404,
  );
});
