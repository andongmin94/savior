import React from "react";
import _ from "lodash";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBtn = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // 각각 복지목록 개수, 한 페이지에 보여줄 데이터개수,
  const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산

  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지네이션 안보이게

  const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onClick={e => onPageChange(e.target.textContent)}
      />
    </Stack>
  );
};
export default PaginationBtn;
