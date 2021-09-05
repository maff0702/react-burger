import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import ingredientsPropTypes from '../../types/types.js'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDeatails from '../modal/ingredient-details';
import { СonstructorContext, SetСonstructorContext } from '../../services/constructorContext';

const IngredientCard = ({ingredients,setActive,setIngredient,stateConstructor,setStateConstructor}) => {
  const clickIngredient = () =>{
    setActive(true);
    setIngredient(ingredients);
    if(ingredients.type === 'bun'){
      setStateConstructor({
        ...stateConstructor,
        bun: ingredients
      })
    }else{
      setStateConstructor({
        ...stateConstructor,
        ingredients: [
          ...stateConstructor.ingredients,
          ingredients
        ]
      })
    }
  }
  return(
  <div className={styles.cart__ingredient}
    onClick={clickIngredient}
  >
    <span className={styles.icon__counter}><Counter count={1} size="small" /></span>
    <img className="mr-4 ml-4" src={ingredients.image} alt={ingredients.name} />
    <p className="mt-1 text text_type_digits-default">{ingredients.price} <CurrencyIcon type="primary" /></p>
    <p className="text text_type_main-default">{ingredients.name}</p>
  </div>
)}

IngredientCard.propTypes = {
  ingredients: ingredientsPropTypes.isRequired,
  setActive: PropTypes.func.isRequired,
  setIngredient: PropTypes.func.isRequired,
  stateConstructor: PropTypes.shape({
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
    bun: ingredientsPropTypes.isRequired
  }).isRequired,
  setStateConstructor: PropTypes.func.isRequired
};

const Ingredients = ({data,type,id,title,setActive,setIngredient,stateConstructor,setStateConstructor}) => (
  <section>
    <h3 className='text text_type_main-medium three' id={id}>{title}</h3>
    <div className={styles.burger__ingredient + " mt-6 mr-2 ml-4"}>
      { data.map((item, index) => {
        if(item.type === type) {
          return <IngredientCard 
                    key={index}
                    ingredients={item}
                    setActive={setActive}
                    setIngredient={setIngredient}
                    stateConstructor={stateConstructor}
                    setStateConstructor={setStateConstructor}
                  />
        }else{
          return null;
        }
        })}
    </div>
  </section>
)

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  setIngredient: PropTypes.func.isRequired,
  stateConstructor: PropTypes.shape({}).isRequired,
  setStateConstructor: PropTypes.func.isRequired
};

export default function BurgerIngredients({data}) {
  const [current, setCurrent] = useState('one');
  const [modalActive, setModalActive] = useState(false);
  const [ingredient, setIngredient] = useState('');

  const clickSkroll = (e) => {
    e.preventDefault();
    const scrollSection = document.getElementById("ingredients-section");
    const ingredientItem = document.getElementById(`${e.currentTarget.id}-list`);    
    scrollSection && ingredientItem && scrollSection.scrollTo({
      top: ingredientItem.offsetTop-287,
      behavior: "smooth"
    });   
  }
  
  const stateConstructor = useContext(СonstructorContext);
  const setStateConstructor = useContext(SetСonstructorContext);

  return (
    <section className={styles.burger__content +' pt-10 pb-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div style={{ display: 'flex' }}  className='mt-5'>
        <span onClick={clickSkroll} id="bun">
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </span>
        <span onClick={clickSkroll} id="sauce">
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Сосусы
          </Tab>
          </span>
          <span onClick={clickSkroll} id="main">
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </span>
      </div>
      <div style={{ textAlign: 'center' }} className="text text_type_main-default mt-3">
        {data.isError && <span>Невозможно загрузить данные, попробуйте обновить страницу</span>}
        {data.isLoading && <span>Идет загрузка ...</span>}
      </div>
      {data.dataIngredients.length > 0 && 
      <section className={styles.wrapper__ingrediends} id="ingredients-section">
        <Ingredients
          data={data.dataIngredients}
          type="bun"
          id="bun-list"
          title="Булки"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        <Ingredients
          data={data.dataIngredients}
          type="sauce"
          id="sauce-list"
          title="Соусы"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        <Ingredients
          data={data.dataIngredients}
          type="main"
          id="main-list"
          title="Начинки"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        
        <Modal
          active={modalActive}
          setActive={setModalActive}
          title="Детали ингредиента"
        >
          {typeof(ingredient)=='object' ? <IngredientDeatails info={ingredient}/> : <div>Ошибка!</div>}
        </Modal>
      </section>}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    dataIngredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
    isError: PropTypes.bool,
    isLoading: PropTypes.bool
  })
} 
