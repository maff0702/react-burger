import { Dispatch, Action } from 'redux';
// import { RootState } from '../index';
import {
  wsConnectionStart,
  wsConnectionClosed,
  wsConnectionClosedStatus,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "../wsOrdersSlice";

export const socketMiddleware = () => {
  return (store: {dispatch: Dispatch}) => {
    let socket: any = null;

    return (next: Dispatch) => (action: Action & {payload: string}) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsConnectionStart.toString()) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnectionSuccess());
        };

        socket.onmessage = (event:{data:string; message: string}) => {
          const message = event.data;
          const data = JSON.parse(message);
          dispatch(wsGetMessage(data));
        };

        socket.onerror = () => {
          dispatch(wsConnectionError());
        };

        socket.onclose = (event:{code:number}) => {
          dispatch(wsConnectionClosedStatus(event.code));
        };
      }
      
      if (type === wsConnectionClosed.toString()) {
        socket.close("1000");
      }

      next(action);
    };
  };
};
