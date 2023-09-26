import { createPortal } from 'react-dom';

import SettingsMenu from '../SettingsMenu';
import { SettingsMenuProps } from '../SettingsMenuProps';

const inlineStyles: React.CSSProperties = {
  position: 'fixed',
  zIndex: 999999,
  top: '10%',
  left: '20%',
  boxShadow: 'border-box',
  width: '60%',
  height: '80%',
  backgroundColor: 'var(--ft-color-background)',
  border: '1px solid var(--ft-color-grey-1)',
};

export default function StoryRenderer(props: SettingsMenuProps): JSX.Element {
  return createPortal(
    <div style={inlineStyles}>
      <SettingsMenu {...props} />
    </div>,
    document.body
  );
}
