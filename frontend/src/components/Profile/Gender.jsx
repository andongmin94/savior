import Form from 'react-bootstrap/Form';

export default function GenderSelectBox({ gender, setGender }) {
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <Form.Select
      id="selectGender"
      value={gender}
      onChange={handleChange}
      size="sm"
      className='inline w-[150px]'
    >
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="female">여자</option>
      <option value="male">남자</option>
    </Form.Select>
  );
};