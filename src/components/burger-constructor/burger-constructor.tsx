import { useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Ingredients from './ingredients';
import { useDrop } from "react-dnd";
import { ingredientCurrentIncrement, deletedAllCurrentIngredient } from '../../store/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder, addElementConstructor, addBunConstructor } from '../../store/constructorSlice'

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const [isModalActive, setModalActive] = useState(false);
  const isObjectEmpty = object =>(JSON.stringify(object) !== '{}' ? true : false)
  const ingredients = useSelector((state: any) => state.constructors.ingredients);
  const bun = useSelector((state: any) => state.constructors.bun);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: any) {
      if(item.type === 'bun'){
        dispatch(addBunConstructor({item}))
        dispatch(ingredientCurrentIncrement({item}))
      } else {
        dispatch(addElementConstructor({item}))
        dispatch(ingredientCurrentIncrement({item}))
      }
    }
  });

  const totalPrice = ingredients.reduce((sum, current) => {
    return sum + current.price;
  }, 0) + (bun.price ? bun.price*2 : 0);

  const handleClick = () => {
    setModalActive(true);
    const idIngredients = [] as any;
    ingredients.forEach(element => idIngredients.push(element._id));
    dispatch(sendOrder([bun._id, ...idIngredients, bun._id]));
    dispatch(deletedAllCurrentIngredient());
  }
  
  return (
    <div className={styles.constructor__content}ref={dropTarget}>
      <section className={styles.constructor__ingredients} >
        <span className="pl-10 " style={{width:'552px'}}> 
          {isObjectEmpty(bun) ? <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          /> : 'Выберите булку из списка и перетащите её сюда :)'}
        </span>
        {ingredients.length > 0 ? 
          <Ingredients /> : 
          <span className="ml-10">Выберите ингредиенты из списка и перетащите сюда</span>
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
        <OrderDetails/>
      </Modal>
    </div>
  );
}
