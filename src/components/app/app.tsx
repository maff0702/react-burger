import styles from './style.module.css';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import data from '../../utils/data.js';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <main className={styles.content__body}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data}/>
        </main>
      </div>
    </div>
  );
}

export default App;
