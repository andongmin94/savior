import { Route, Routes } from "react-router-dom";

import Layout from "@/components/layout/layout";
import Main from "@/pages/Main";
import Auth from "./pages/OAuth";
import Profile from "@/pages/Profile";
import Manual from "@/pages/Manual";
import Qna from "@/pages/Qna";
import QnaCreate from "@/pages/QnaCreate";
import QnaPatch from "@/pages/QnaPatch";
import QnaDetail from "@/pages/QnaDetail";
import WelfareSearch from "@/pages/WelfareSearch";
import WelfareRecommend from "@/pages/WelfareRecommend";
import WelfareDetail from "./pages/WelfareDetail";
import CustomFilter from "@/pages/CustomFilter";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/oauth/kakao/callback" element={<Auth />} />
          <Route path="/" element={<Main />} />
          <Route path="/welfare/:welfareId" element={<WelfareDetail />} />
          <Route path="/Qna" element={<Qna />} />
          <Route path="/search" element={<WelfareSearch />} />
          <Route path="/QnaCreate/" element={<QnaCreate />} />
          <Route path="/QnaPatch/:qnaId" element={<QnaPatch />} />
          <Route path="/QnaDetail/:qnaId" element={<QnaDetail />} />
          <Route path="/filter" element={<CustomFilter />} />
          <Route path="/recommend" element={<WelfareRecommend />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}
