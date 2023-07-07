import { IconProps } from './components/IconProps';
import ContainerIcon from './components/Icon';

const IconArrowDown = ({
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Complete">
            <g id="F-Chevron">
              <polyline
                fill="none"
                id="Down"
                points="5 8.5 12 15.5 19 8.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </g>
        </svg>
      }
      type={type}
    />
  );
};

export default IconArrowDown;
