
export const socketMiddleware = () => {
  return store => {
    let socket: any = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === "wsOrders/wsConnectionStart") {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: "wsOrders/wsConnectionSuccess" });
        };

        socket.onmessage = (event) => {
          const message = event.data;
          const data = JSON.parse(message);
          console.log(data);
          dispatch({ type: "wsOrders/wsGetMessage", payload: data });
        };

        socket.onerror = () => {
          dispatch({ type: "wsOrders/wsConnectionError" });
        };

        socket.onclose = (event) => {
          dispatch({ type: "wsOrders/wsConnectionClosedStatus", payload: event.code });
        };
      }
      
      if (type === "wsOrders/wsConnectionClosed") {
        socket.close("1000");
      }

      next(action);
    };
  };
};
