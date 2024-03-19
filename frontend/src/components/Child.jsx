import Form from 'react-bootstrap/Form';

const ChildSelectBox = ({ child, setChild }) => {
  const handleChange = (e) => {
    setChild(e.target.value);
  };

  return (
    <Form.Select
      id="selectChild"
      value={child}
      onChange={handleChange}
      style={{
        width: '250px',
      }}
    >
      <option value="1">있음(출산예정/ 입양예정)</option>
      <option value="2">없음</option>
    </Form.Select>
  );
};

export default ChildSelectBox;
