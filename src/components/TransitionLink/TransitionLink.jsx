import { Link } from 'react-router-dom';
import { usePageTransition } from '../../context/PageTransitionContext';

const TransitionLink = ({ to, onClick, ...props }) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(to);
  };

  return <Link to={to} {...props} onClick={handleClick} />;
};

export default TransitionLink;
