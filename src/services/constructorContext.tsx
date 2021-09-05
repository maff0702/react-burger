import { createContext } from 'react';

  export const СonstructorContext = createContext({
    ingredients: [],
    bun: {}
  });
  export const SetСonstructorContext = createContext((...params)=>{});