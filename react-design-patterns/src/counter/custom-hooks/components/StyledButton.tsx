import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export { StyledButton };
