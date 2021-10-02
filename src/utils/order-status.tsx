const OrderStatus = (status) => {
  console.log(status);
  
  return status === "done" && 
   <p className="text text_type_main-default mt-2"
    style={{color: '#00CCCC'}}
  >Выполнен</p>
}

export default OrderStatus;
