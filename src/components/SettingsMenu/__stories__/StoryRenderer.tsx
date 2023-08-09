import { createPortal } from 'react-dom';

import SettingsMenu from '../SettingsMenu';
import { SettingsMenuProps } from '../SettingsMenuProps';

const inlineStyles: React.CSSProperties = {
  position: 'fixed',
  zIndex: 999999,
  top: 0,
  width: '100%',
  height: '68px',
  backgroundColor: 'var(--ft-color-background)',
};

export default function StoryRenderer(props: SettingsMenuProps) {
  return createPortal(
    <div style={inlineStyles}>
      <SettingsMenu {...props} />
    </div>,
    document.body
  );
}
