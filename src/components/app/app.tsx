import styles from './app.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from '../../store';

function App() {   
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <main className={styles.content__body}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
