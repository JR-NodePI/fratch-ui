import type { Meta, StoryObj } from '@storybook/react';

import Spinner from './Spinner';
import { SpinnerProps, SpinnerType } from './SpinnerProps';

const StoryRenderer = (args: SpinnerProps) => (
  <div>
    <Spinner {...args} />
    <h1>Fake page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros
      augue, fringilla quis nunc sit amet, cursus varius purus. Pellentesque non
      risus magna. Integer pulvinar odio augue, non gravida tortor ultricies eu.
      Nunc eget tincidunt nulla, eget consectetur enim. Donec pellentesque odio
      non massa consectetur, sodales finibus elit congue. Vivamus tincidunt,
      neque nec consequat sagittis, nibh lacus luctus metus, non lobortis est
      massa ac nulla. Donec placerat, risus ut convallis cursus, quam metus
      auctor turpis, pretium porttitor leo diam eget tellus. Nulla ultrices, leo
      sit amet facilisis auctor, arcu dui dignissim orci, eu tempor nulla odio
      sed orci. Pellentesque tempor posuere vehicula. Quisque vestibulum
      venenatis velit, eget facilisis dui sodales sed. Suspendisse quis est dui.
      Donec hendrerit, dolor eu vestibulum eleifend, lorem felis dictum sem,
      quis fringilla nisi est a lectus. Cras interdum, lacus sed vehicula
      feugiat, eros risus eleifend ipsum, non vestibulum quam urna quis enim.
      Vivamus ut est nulla.
    </p>
    <p>
      Curabitur ut tortor sit amet erat faucibus auctor at sed nunc. Donec
      posuere enim et nisi faucibus, tempor rutrum magna gravida. Duis maximus
      condimentum dui, eu malesuada tellus imperdiet vel. Curabitur viverra orci
      vel dui malesuada maximus. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Vivamus ut ultricies eros, at
      accumsan sapien. Donec ornare sagittis ipsum, eget molestie nulla volutpat
      a. Morbi at mauris elementum, dapibus erat id, accumsan sapien. Praesent
      condimentum consequat quam, a ultrices nunc maximus in. Etiam tempus eros
      dui, ac egestas velit semper sollicitudin. Proin eget mattis diam.
    </p>
  </div>
);

const meta = {
  title: 'Example/Spinner',
  component: StoryRenderer,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: Object.values(SpinnerType),
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    cover: false,
    type: 'primary',
    inverted: false,
    label: 'Loading...',
  },
};
