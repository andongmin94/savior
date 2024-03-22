import PropTypes from 'prop-types';
import { Chip, Typography, FormHelperText } from '@mui/material';

export default function MultipleSelectChips({ value, setValue, options, label, error, setError }) {

  const handleClick = (clickedValue) => {
    if (setError) {
      setError('');
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
    } else {
      setValue([...value, clickedValue]);
    }
  };

  return (
    <div className="mb-[2%] my-2 text-center ">
      <h5>
        <b>{label}</b>
      </h5>
      {Boolean(error) && (
        <FormHelperText className='text-center' error={Boolean(error)}>
          {error}
        </FormHelperText>
      )}
      <div className='mt-[0.3rem] '>
        {options && options.length
          ? options.map((option, i) => (
              <Chip className='m-2 p-2 text-white hover:bg-[#f5a623] hover:border-[#f5a623]'
                icon={option.icon}
                key={i}
                color="warning"
                variant={value.find((e) => e === option.value) ? 'default' : 'outlined'}
                label={<Typography variant="body2">{`${option.label}`}</Typography>}
                clickable
                onClick={() => handleClick(option.value)}
              />
            ))
          : null}
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
