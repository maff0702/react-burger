import styles from './style.module.css';
import Header from './components/app-header/AppHeader';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

import data from './utils/data.js';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container + ' ' + styles.content__body}>
        <BurgerIngredients data={data} />
        <BurgerIngredients data={data} />
      </div>
    </div>
  );
}

export default App;
