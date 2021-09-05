import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import ingredientsPropTypes from '../../types/types.js'
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import { СonstructorContext } from '../../services/constructorContext';

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
    {data.map((item, index) => {
        return <IngedientElement key={index} data={item}/>
      })}
  </div>
)

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
};

export default function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const [order, setOrder] = useState({
    order: null,
    isError: false,
    isLoading: true,
  });
  const stateConstructor = useContext(СonstructorContext);
  const urlOrder = 'https://norma.nomoreparties.space/api/orders';
  let ingredients;
  let bun;
  let priceBun = 0;
  let totalPrice = 0;
  let price = 0;
  let idBurgerIngredients = [] as any;
  let idIngredients = [] as any;
  if(JSON.stringify(bun) !== '{}') {
    bun = stateConstructor.bun;
  }
  if(stateConstructor.ingredients.length > 0) {
    ingredients = stateConstructor.ingredients;
    price = ingredients.reduce((sum, current) => {
      return sum + current.price;
    }, 0);
    ingredients.map((item) => {
      idIngredients.push(item._id)
    })
  }
  if(JSON.stringify(bun) !== '{}') {
    priceBun = bun.price + priceBun;
    idBurgerIngredients = [bun._id,...idIngredients,bun._id]
  }
  totalPrice = priceBun*2 + price;

  const handleClick = () => {
    setModalActive(true);
    (async () => {
      try {
        const response = await fetch(urlOrder, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ingredients: idBurgerIngredients})
       });
       if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
        const successResponse = await response.json();
        setOrder({
          order: successResponse.order.number,
          isError: false,
          isLoading: false,
        });
      }catch (error) {
        setOrder({
          ...order,
          isError: true,
          isLoading: false,
        });
      }
    })()
  }
  
  return (
    <div className={styles.constructor__content}>
      <section className={styles.constructor__ingredients} >
        <span className="pl-10 " style={{width:'552px'}}> 
          {JSON.stringify(bun) !== '{}' ? <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          /> : 'Выберите булку из списка'}
        </span>
        {ingredients ? 
          <Ingredients data={ingredients}/> : 
          <span className="ml-10">Выберите ингредиенты из списка</span>
        }
        <span className="pl-10" style={{width:'552px'}}>
          {JSON.stringify(bun) !== '{}' && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </span>
      </section>  
      <div className={"mt-10 " + styles.constructor__info}>
        <span className="text text_type_digits-medium mr-10"><span>{totalPrice}</span><CurrencyIcon type="primary" /></span>
        {JSON.stringify(bun) !== '{}' ? <Button 
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Оформить заказ
        </Button> : ''}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        title=""
      >
        <OrderDetails info={order}/>
      </Modal>
    </div>
  );
}
