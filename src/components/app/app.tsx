import {useState, useEffect} from 'react';
import styles from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerIngredientsContext, SetBurgerIngredientsContext } from '../../services/BurgerIngredientsContext'
import { requestIngredients } from '../../utils/api';

function App() {
  const [state, setState] = useState({
    dataIngredients: [],
    isError: false,
    isLoading: true
  });
  const [stateConstructor, setStateConstructor] = useState({
    ingredients: [],
    bun: {}
  });

  useEffect(()=>{requestIngredients(state, setState);},[]);
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <main className={styles.content__body}>
          <BurgerIngredientsContext.Provider value={stateConstructor}>
            <SetBurgerIngredientsContext.Provider  value={setStateConstructor}>
              <BurgerIngredients data={state}/>
              {!state.isError && !state.isError && <BurgerConstructor/>}
            </SetBurgerIngredientsContext.Provider>
          </BurgerIngredientsContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default App;
