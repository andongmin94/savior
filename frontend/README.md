# Savior Frontend

사용자 조건에 맞는 복지 서비스를 추천하고 탐색하는 React·Electron 클라이언트입니다.

## 실행

```bash
npm ci
npm run demo
```

`demo` 모드는 별도의 백엔드나 OAuth 없이 로컬 샘플 데이터로 실행됩니다.

Electron에서는 다음 명령을 사용합니다.

```bash
npm run app:demo
```

## 검증

```bash
npm run test
npm run lint
npm run build:demo
```

Spring Boot·Django 서버와 연결할 때 필요한 환경값은 [`.env.example`](.env.example)을 참고하세요. 서비스 화면과 전체 시스템 구성은 [루트 README](../README.md)에 정리되어 있습니다.
