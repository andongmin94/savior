export default function GugunSelectBox({ isAll, setRegion, region }) {
  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  if (isAll === 'All') {
    return (
      <select id="selectGugunAll" value={region} onChange={handleChange} readOnly>
        <option value="00" readOnly>
          전체
        </option>
      </select>
    );
  } else if (isAll === 'GwangJu') {
    return (
      <select id="selectGugunGwangJu" value={region} onChange={handleChange} readOnly>
        <option value="10">전체</option>
        <option value="11">광산구</option>
        <option value="12">남구</option>
        <option value="13">동구</option>
        <option value="14">북구</option>
        <option value="15">서구</option>
      </select>
    );
  }
};