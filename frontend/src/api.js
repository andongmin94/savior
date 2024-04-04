import axios from "axios";

import { isMockMode } from "@/mocks/demoStore";
import mockAdapter from "@/mocks/mockAdapter";

const springBaseUrl =
  import.meta.env?.VITE_SPRING_API_URL ?? "http://localhost:8080";
const djangoBaseUrl =
  import.meta.env?.VITE_DJANGO_API_URL ?? "http://localhost:8000";

/**
 * 화면이 동일한 요청 코드를 유지하도록 실행 모드에 맞는 Axios client를 만든다.
 * Mock 모드에서는 네트워크 대신 기존 백엔드 응답 계약을 구현한 adapter를 사용한다.
 *
 * @param {string} baseURL API 서버 기본 주소
 * @returns {import("axios").AxiosInstance} 구성된 Axios client
 */
function createClient(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    ...(isMockMode ? { adapter: mockAdapter } : {}),
  });
}

const Axios = createClient(springBaseUrl);

/**
 * Spring Boot 사용자·복지 API client에 현재 access token을 반영해 반환한다.
 *
 * @returns {import("axios").AxiosInstance} Spring Boot API client
 */
function getAxios() {
  const token = localStorage.getItem("token");
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
  return Axios;
}

const AxiosDjango = createClient(djangoBaseUrl);

/**
 * 사용자 추천 군집 갱신에 사용하는 Django API client를 반환한다.
 *
 * @returns {import("axios").AxiosInstance} Django API client
 */
function getAxiosDjango() {
  return AxiosDjango;
}

export { getAxios, getAxiosDjango, isMockMode };
