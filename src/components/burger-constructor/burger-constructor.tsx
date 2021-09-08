import { useState, useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import { BurgerIngredientsContext } from '../../services/BurgerIngredientsContext';
import { sendOrder } from '../../utils/api';
import Ingredients from './ingredients';

export default function BurgerConstructor() {
  const [isModalActive, setModalActive] = useState(false);
  const [order, setOrder] = useState({
    order: null,
    isError: false,
    isLoading: true,
  });
  const isObjectEmpty = object =>(JSON.stringify(object) !== '{}' ? true : false)

  const stateConstructor = useContext(BurgerIngredientsContext);
  let ingredients;
  let bun;
  let priceBun = 0;
  let totalPrice = 0;
  let price = 0;
  let idBurgerIngredients = [] as any;
  let idIngredients = [] as any;

  if(isObjectEmpty(bun)) bun = stateConstructor.bun;

  if(stateConstructor.ingredients.length > 0) {
    ingredients = stateConstructor.ingredients;
    price = ingredients.reduce((sum, current) => {
      return sum + current.price;
    }, 0);
    ingredients.forEach((item) =>{
      idIngredients.push(item._id)
    })
  }
  if(isObjectEmpty(bun)) {
    priceBun = bun.price + priceBun;
    idBurgerIngredients = [bun._id,...idIngredients,bun._id]
  }
  totalPrice = priceBun*2 + price;

  const handleClick = () => {
    setModalActive(true);
    sendOrder(order, setOrder, idBurgerIngredients);
  }
  
  return (
    <div className={styles.constructor__content}>
      <section className={styles.constructor__ingredients} >
        <span className="pl-10 " style={{width:'552px'}}> 
          {isObjectEmpty(bun) ? <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          /> : 'Выберите булку из списка'}
        </span>
        {ingredients ? 
          <Ingredients data={ingredients}/> : 
          <span className="ml-10">Выберите ингредиенты из списка</span>
        }
        <span className="pl-10" style={{width:'552px'}}>
          {isObjectEmpty(bun) && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </span>
      </section>  
      <div className={"mt-10 " + styles.constructor__info}>
        <span className="text text_type_digits-medium mr-10"><span>{totalPrice}</span><CurrencyIcon type="primary" /></span>
        {isObjectEmpty(bun) ? <Button 
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Оформить заказ
        </Button> : ''}
      </div>
      <Modal
        active={isModalActive}
        setActive={setModalActive}
        title=""
      >
        <OrderDetails info={order}/>
      </Modal>
    </div>
  );
}
