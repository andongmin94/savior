import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "@/components/layout/layout";

const Main = lazy(() => import("@/pages/Main"));
const Profile = lazy(() => import("@/pages/Profile"));
const WelfareSearch = lazy(() => import("@/pages/WelfareSearch"));
const WelfareRecommend = lazy(() => import("@/pages/WelfareRecommend"));
const WelfareDetail = lazy(() => import("@/pages/WelfareDetail"));
const CustomFilter = lazy(() => import("@/pages/CustomFilter"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * 브라우저와 Electron renderer가 공유하는 최상위 레이아웃과 라우트 경계를 구성한다.
 * 각 페이지는 지연 로딩해 최초 화면에 필요한 번들만 먼저 전달한다.
 */
export default function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-blue-800">
              데모 화면을 불러오는 중입니다.
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/welfare/:welfareId" element={<WelfareDetail />} />
            <Route path="/search" element={<WelfareSearch />} />
            <Route path="/filter" element={<CustomFilter />} />
            <Route path="/recommend" element={<WelfareRecommend />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}
