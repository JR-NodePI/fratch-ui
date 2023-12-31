import Spinner from '../Spinner';
import { SpinnerProps } from '../SpinnerProps';

const StoryRenderer = (args: SpinnerProps): JSX.Element => (
  <div>
    <Spinner {...args} />
    <h1>Fake page</h1>
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

export default StoryRenderer;
