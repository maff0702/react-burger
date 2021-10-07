import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) =>  {
    const { isAuth, isLoading, isError } = useSelector((state) => state.auth);

    return (
      <>{
        !isLoading && !isError && <Route
          {...rest}
          render={({ location }) =>
            isAuth ? (
              children
            ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: location }
                    }}
                  />
                )
          }
        />
      }</>
  );
}
