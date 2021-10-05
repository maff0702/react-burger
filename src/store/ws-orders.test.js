import reducer, {
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetMessage,
  wsConnectionClosed,
  wsConnectionClosedStatus,
  wsConnectionError,
  orderModalOpen,
  orderModalClose,
} from './wsOrdersSlice';

const state = {
  orders: [],
  total: null,
  totalToday: null,
  message: '',
  url: '',
  isConnected: false,
  isError: false,
  isLoading: false,
  statusCode: null,
  isModalOrder: false,
  orderModalTitle: '',
};
const orders = {
  _id: 'string',
  ingredients: [],
  status: 'string',
  name: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  number: 1,
}

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(state);
});

test('WS start', () => {
  expect(reducer(state, wsConnectionStart('string'))).toEqual({
    ...state,
    url: 'string',
    isLoading: true,
  })
})

test('WS success connected', () => {
  expect(reducer(state, wsConnectionSuccess())).toEqual({
    ...state,
    isConnected: true,
    isError: false,
  })
})

test('WS get message', () => {
  expect(reducer(state, wsGetMessage({orders, total: 1, totalToday: 1, message: 'message'}))).toEqual({
    ...state,
    orders: orders,
    total: 1,
    totalToday: 1,
    message: 'message',
    isLoading: false,
  })
})

test('deleted the number of ingredients currently in the constructor', () => {
  expect(reducer(state, wsConnectionClosed())).toEqual({
    ...state,
    orders: null,
    total: null,
    totalToday: null,
    isConnected: false,
  })
})

test('WS closed and get status', () => {
  expect(reducer(state, wsConnectionClosedStatus(1001))).toEqual({
    ...state,
    statusCode: 1001
  })
})

test('WS error', () => {
  expect(reducer(state, wsConnectionError())).toEqual({
    ...state,
    isError: true,
    isLoading: false,
  })
})

test('modal open', () => {
  expect(reducer(state, orderModalOpen('#123'))).toEqual({
    ...state,
    orderModalTitle: '#123',
    isModalOrder: true,
  })
})

test('modal close', () => {
  expect(reducer(state, orderModalClose())).toEqual({
    ...state,
    orderModalTitle: '',
    isModalOrder: false,
  })
})
