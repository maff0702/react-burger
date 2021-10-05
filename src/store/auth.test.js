import reducer from './authSlice';

const state = {
  user: null,
  isAuth: false,
  isError: false,
  isLoading: false,
  forgotStatus: false,
  resetStatus: false,
};

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(state);
});
