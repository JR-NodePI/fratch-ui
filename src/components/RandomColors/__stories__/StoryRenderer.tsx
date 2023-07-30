import { CSSProperties } from 'react';

import { COLOR_LIST_FOR_RANDOMIZE } from '../../../constants';
import getRandomColor from '../../../helpers/getRandomColor';

const ColorItem = ({
  color,
}: {
  color: CSSProperties['color'];
}): JSX.Element => (
  <p
    style={{
      background: color,
      padding: 8,
      width: 80,
      height: 80,
      display: 'inline-block',
      margin: 4,
      fontSize: 12,
    }}
  >
    {color}
  </p>
);

export default function StoryRenderer(): JSX.Element {
  const excludedRandomizedColors: CSSProperties['color'][] = [];

  return (
    <>
      <h1>Available list</h1>
      {COLOR_LIST_FOR_RANDOMIZE.map(color => {
        return <ColorItem key={color} color={color} />;
      })}

      <h1>Random colors from available list</h1>
      {Array.from(Array(COLOR_LIST_FOR_RANDOMIZE.length).keys()).map(index => {
        const color = getRandomColor(excludedRandomizedColors);
        excludedRandomizedColors.push(color);
        return <ColorItem key={index} color={color} />;
      })}
    </>
  );
}
