import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCounterContext } from '../useCounterContext';
import { StyledButton } from './StyledButton';

function Decrement({ icon = 'minus' }: { icon: IconProp }) {
  console.info('Decrement rendering')
  const { handleDecrement } = useCounterContext();
  return (
    <StyledButton onClick={handleDecrement}>
      <FontAwesomeIcon icon={icon} color='#17a2b8' />
    </StyledButton>
  );
}

export default Decrement;
