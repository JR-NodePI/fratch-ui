import { CSSProperties, useState } from 'react';

import { Button } from '../../components';
import { c } from '../../helpers';
import { AVAILABLE_COLOR_LIST } from '../../helpers/colorConstants';
import { getContrastColor, getRandomColor } from '../../helpers/colorHelpers';

import styles from './StoryRenderer.module.css';

const ColorItem = ({
  color,
}: {
  color?: CSSProperties['color'];
}): JSX.Element => (
  <p
    className={c(styles.color_item)}
    style={
      color ? { color: getContrastColor(color), backgroundColor: color } : {}
    }
  >
    <span>{color || <>&nbsp;</>}</span>
  </p>
);

export default function StoryRenderer(): JSX.Element {
  const [randomizedColors, setRandomizedColors] = useState<
    CSSProperties['color'][]
  >([]);

  const handleAddRandomColor = (): void => {
    if (randomizedColors.length === AVAILABLE_COLOR_LIST.length) return;

    setRandomizedColors([
      ...randomizedColors,
      getRandomColor(randomizedColors),
    ]);
  };

  const handleRemoveColor = (): void => {
    setRandomizedColors([...randomizedColors.slice(0, -1)]);
  };

  return (
    <>
      <h1>Available color list</h1>
      {AVAILABLE_COLOR_LIST.map(color => {
        return <ColorItem key={color} color={color} />;
      })}

      <h1>Random colors from available list</h1>
      <p>
        <Button size="smaller" type="primary" onClick={handleAddRandomColor}>
          Add color
        </Button>
        &nbsp;
        <Button size="smaller" type="secondary" onClick={handleRemoveColor}>
          Remove color
        </Button>
      </p>

      {Array.from({ length: AVAILABLE_COLOR_LIST.length }).map((_, index) => (
        <ColorItem key={index} color={randomizedColors[index] ?? ''} />
      ))}
    </>
  );
}
