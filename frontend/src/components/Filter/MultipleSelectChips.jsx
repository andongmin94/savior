import PropTypes from 'prop-types';
import { Chip, Typography, FormHelperText } from '@mui/material';
import { orange } from '@mui/material/colors'; // 오렌지 색상 임포트

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
      <Typography variant="h5" component="h5" gutterBottom>
        <strong>{label}</strong>
      </Typography>
      {error && (
        <FormHelperText error>
          {error}
        </FormHelperText>
      )}
      <div className='mt-2'>
        {options.map((option, i) => (
          <Chip
            key={i}
            label={<Typography variant="body2" sx={{ 
              color: value.includes(option.value) ? 'white' : orange[500] // 조건부 글자 색상
            }}>{option.label}</Typography>}
            onClick={() => handleClick(option.value)}
            sx={{
              borderColor: orange[500], // 오렌지색 테두리
              color: orange[500], // 오렌지색 글자 (기본)
              margin: 1, // 여백
              '&.MuiChip-outlined': {
                border: `1px solid ${orange[500]}`, // 오렌지색 외곽선
              },
              backgroundColor: value.includes(option.value) ? orange[500] : 'transparent', // 조건부 배경색
              '&:hover': {
                backgroundColor: value.includes(option.value) ? orange[700] : orange[50], // 호버 시 배경색 변경
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
