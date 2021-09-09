import { API_URL } from "./constants";

export const requestIngredients = async(state,setState) => {
  try {
    const response = await fetch(`${API_URL}ingredients`);
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
}

export const sendOrder = async(order, setOrder, idBurgerIngredients) => {
  try {
    const response = await fetch(`${API_URL}orders`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ingredients: idBurgerIngredients})
   });
   if (!response.ok) {
    throw new Error('Ошибка сети ...');
  }
    const successResponse = await response.json();
    setOrder({
      order: successResponse.order.number,
      isError: false,
      isLoading: false,
    });
  }catch (error) {
    setOrder({
      ...order,
      isError: true,
      isLoading: false,
    });
  }
}
