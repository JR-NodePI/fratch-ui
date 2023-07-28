import IconContainer from './components/IconContainer';
import { IconProps } from './components/IconProps';

const IconArrowDown = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <IconContainer
      className={className}
      svg={
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-2 -5 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          />
        </svg>
      }
      type={type}
    />
  );
};

export default IconArrowDown;
