import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types.js'
import styles from './style.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const idIngredients = [6,4,7,8,8,12,6];

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
  data: ingredientsPropTypes.isRequired,
};

const Ingredients = ({data}) => (
  <div className={styles.wrapper__ingrediends}>
    {idIngredients.map((item, index) => {
        return <IngedientElement key={index} data={data[item]}/>
      })}
  </div>
);

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
};

export default function BurgerConstructor({data}) {
  return (
    <div className={styles.constructor__content}>
      <section className={styles.constructor__ingredients} >
        <span className="pl-10 " style={{width:'552px'}}> 
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + " (верх)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </span>
        <Ingredients data={data} />
        <span className="pl-10" style={{width:'552px'}}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + " (низ)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </span>
      </section>  
      <div className={"mt-10 " + styles.constructor__info}>
        <span className="text text_type_digits-medium mr-10"><span>1000</span><CurrencyIcon type="primary" /></span>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    ingredientsPropTypes.isRequired
  )
} 
