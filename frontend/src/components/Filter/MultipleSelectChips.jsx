import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chip, Typography, FormHelperText } from '@mui/material';

const StyledContainer = styled.div`
  font-family: 'Pretendard';
  margin-bottom: 2%;
  margin: .5rem 0 .5rem;
  text-align: center;
`;

const ChipsDiv = styled.div`
  margin-top: .3rem;
`;

const StyledChip = styled(Chip)`
  margin: .5rem;
  padding: .5rem;
`;

const StyledFormHelperText = styled(FormHelperText)`
  text-align: center;
`;

const MultipleSelectChips = ({ value, setValue, options, label, error, setError }) => {

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
    <StyledContainer>
      <h5>
        <b>{label}</b>
      </h5>
      {Boolean(error) && (
        <StyledFormHelperText error={Boolean(error)}>
          {error}
        </StyledFormHelperText>
      )}
      <ChipsDiv>
        {options && options.length
          ? options.map((option, i) => (
              <StyledChip
                icon={option.icon}
                key={i}
                color="primary"
                variant={value.find((e) => e === option.value) ? 'default' : 'outlined'}
                label={<Typography variant="body2">{`${option.label}`}</Typography>}
                clickable
                onClick={() => handleClick(option.value)}
              />
            ))
          : null}
      </ChipsDiv>
    </StyledContainer>
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

export default MultipleSelectChips;