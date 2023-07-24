import ContainerIcon from './components/Icon';
import { IconProps } from './components/IconProps';

const IconCheck = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <ContainerIcon
      className={className}
      svg={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-2 -4 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      }
      type={type}
    />
  );
};

export default IconCheck;
