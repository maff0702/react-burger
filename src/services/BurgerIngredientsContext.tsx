import { createContext } from 'react';

  export const BurgerIngredientsContext = createContext({
    ingredients: [],
    bun: {}
  });

  export const SetBurgerIngredientsContext = createContext((...params)=>{});
  