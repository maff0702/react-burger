import {useState, useEffect} from 'react';
import styles from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { СonstructorContext, SetСonstructorContext } from '../../services/constructorContext'

// import data from '../../utils/data.js';

function App() {
  const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = useState({
    dataIngredients: [],
    isError: false,
    isLoading: true
  });
  const [stateConstructor, setStateConstructor] = useState({
    ingredients: [],
    bun: {}
  });

  useEffect(()=>{
   (async () => {
    try {
      const response = await fetch(urlIngredients);
      if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
      const successResponse = await response.json();
      setState({
        dataIngredients: successResponse.data,
        isError: false,
        isLoading: false,
      });
    }catch (error) {
      setState({
        ...state,
        isError: true,
        isLoading: false,
      }); 
    }
   })()
  },[]);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <main className={styles.content__body}>
          <СonstructorContext.Provider value={stateConstructor}>
            <SetСonstructorContext.Provider  value={setStateConstructor}>
              <BurgerIngredients data={state}/>
              {!state.isError && !state.isError && <BurgerConstructor/>}
            </SetСonstructorContext.Provider>
          </СonstructorContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default App;
