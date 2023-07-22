import ContainerIcon from './components/Icon';
import { IconProps } from './components/IconProps';

const IconPlus = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <ContainerIcon
      className={className}
      svg={
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-2 -2 22 22"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 1v16M1 9h16"
          />
        </svg>
      }
      type={type}
    />
  );
};

export default IconPlus;
