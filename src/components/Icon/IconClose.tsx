import { IconProps } from './components/IconProps';
import ContainerIcon from './components/Icon';

const IconClose = ({
  type,
  className,
}: Pick<IconProps, 'type' | 'className'>): JSX.Element => {
  return (
    <ContainerIcon
      className={className}
      svg={
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Menu / Close_SM">
            <path
              id="Vector"
              d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      }
      type={type}
    />
  );
};

export default IconClose;
