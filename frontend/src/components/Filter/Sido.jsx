export default function SidoSelectBox({ setIsAll, isAll, setRegion }) {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    if (e.target.value === 'All') {
      setRegion('00');
    } else if (e.target.value === 'GwangJu') {
      setRegion('10');
    }
  };

  return (
    <select id="selectSido" value={isAll} onChange={handleChange} readOnly>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

