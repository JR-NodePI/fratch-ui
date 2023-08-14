import { CSSProperties, useState } from 'react';

import { COLOR_LIST } from '../../../constants';
import { c } from '../../../helpers/classNameHelpers';
import { getContrastColor } from '../../../helpers/colorHelpers';
import getRandomColor from '../../../helpers/getRandomColor';
import { Button } from '../..';

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

  const handleAddRandomColor = () => {
    if (randomizedColors.length === COLOR_LIST.length) return;

    setRandomizedColors([
      ...randomizedColors,
      getRandomColor(randomizedColors),
    ]);
  };

  const handleRemoveColor = () => {
    setRandomizedColors([...randomizedColors.slice(0, -1)]);
  };

  return (
    <>
      <h1>Available list</h1>
      {COLOR_LIST.map(color => {
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

      {Array.from({ length: COLOR_LIST.length }).map((_, index) => (
        <ColorItem key={index} color={randomizedColors[index] ?? ''} />
      ))}
    </>
  );
}
