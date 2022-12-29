import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCounterContext } from '../useCounterContext';
import { StyledButton } from './StyledButton';

function Increment({ icon = 'plus' }: { icon: IconProp }) {
  console.info('Increment rendering')
  const { handleIncrement } = useCounterContext();
  return (
    <StyledButton onClick={handleIncrement}>
      <FontAwesomeIcon icon={icon} color='#17a2b8' />
    </StyledButton>
  );
}

export default Increment;
