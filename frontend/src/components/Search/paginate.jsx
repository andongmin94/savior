// 페이지 별로 다른 데이터들을 보여줘야 한다.
// lodash를 사용하여 배열을 잘라 각 페이지 별로 아이템이 속한 배열을 얻어온다.

import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

  return _(items).slice(startIndex).take(pageSize).value();
  // 시작점부터 배열을 자르되, pageSize만큼의 배열을 취함. lodash wrapper 객체를 regular배열로 변환
}
