import { Link } from '../../router';
import { usePageTransition } from '../../context/PageTransitionContext';

const TransitionLink = ({ to, onClick, ...props }) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (event) => {
    onClick?.(event);

    const link = event.currentTarget;
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self') ||
      new URL(link.href).origin !== window.location.origin
    ) {
      return;
    }

    event.preventDefault();
    navigateWithTransition(to);
  };

  return <Link to={to} {...props} onClick={handleClick} />;
};

export default TransitionLink;
