import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import { useCounter } from './useCounter';

const MAX_COUNT = 10;

function Usage() {
  const { count, getCounterProps, getIncrementProps, getDecrementProps } =
    useCounter({ initial: 0, max: MAX_COUNT });

  const handleBtn1Clicked = () => {
    console.info('btn 1 clicked');
  };

  return (
    <>
      <Counter {...getCounterProps()}>
        <Counter.Decrement icon={'minus'} {...getDecrementProps()} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count max={MAX_COUNT} />
        <Counter.Increment icon={'plus'} {...getIncrementProps()} />
      </Counter>
      <StyledContainer>
        <button {...getIncrementProps({ onClick: handleBtn1Clicked })}>
          Custom increment btn 1
        </button>
      </StyledContainer>
      <StyledContainer>
        <button {...getIncrementProps({ disabled: count > MAX_COUNT - 2 })}>
          Custom increment btn 2
        </button>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  margin-top: 20px;
`;

export default Usage;
