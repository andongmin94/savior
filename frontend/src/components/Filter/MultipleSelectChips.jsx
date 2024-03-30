import PropTypes from 'prop-types';
import { Chip, Typography, FormHelperText } from '@mui/material';
import { orange, blue } from '@mui/material/colors'; // 오렌지 색상 임포트

export default function MultipleSelectChips({ value, setValue, options, label, error, setError }) {

  const handleClick = (clickedValue) => {
    if (setError) {
      setError('');
    }
    if (value.includes(clickedValue)) { // 선택된 값 찾기
      setValue(value.filter(item => item !== clickedValue)); // 선택 제거
    } else {
      setValue([...value, clickedValue]); // 선택 추가
    }
  };

  return (
    <div className="mb-2 my-2 text-center">
      <div className='font-bold text-2xl' style={{ fontFamily: "TmoneyRoundWind" }}>
        <strong>{label}</strong>
      </div>
      {error && (
        <FormHelperText error>
          {error}
        </FormHelperText>
      )}
      <div className='mt-2'>
        {options.map((option, i) => (
          <Chip
            key={i}
            label={<div style={{fontFamily:'TmoneyRoundWind'}} className='text-white text-lg font-bold'>{option.label}</div>}
            onClick={() => handleClick(option.value)}
            sx={{
              borderColor: 'transparent',
              color: blue[500], 
              margin: 1, // 여백
              backgroundColor: value.includes(option.value) ? blue[900] : blue[600], // 조건부 배경색
              '&:hover': {
                backgroundColor: value.includes(option.value) ? blue[900] : 'transparent', // 호버 시 배경색 변경
              },
            }}
            variant={value.includes(option.value) ? 'filled' : 'outlined'} // 조건부 스타일 변화
            clickable
          />
        ))}
      </div>
    </div>
  );
};

MultipleSelectChips.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
};
