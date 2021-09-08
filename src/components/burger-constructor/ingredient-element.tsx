import ingredientsPropType from '../../types/types.js'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngedientElement = ({data}) => (
  <span>
    <DragIcon type="primary" />
    <ConstructorElement
      text={data.name}
      price={data.price}
      thumbnail={data.image}
    />
  </span>
)

IngedientElement.propTypes = {
  data: ingredientsPropType.isRequired,
};

export default IngedientElement;
