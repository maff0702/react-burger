import { FC, ReactNode } from 'react';
import { Route, Redirect  } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';

interface IRest {
  readonly children: ReactNode;
  readonly path: string;
}
interface IProtectedRouteProps {
  readonly children: ReactNode;
  readonly rest: IRest;
}

export const ProtectedRoute: FC<any> = ({ children, ...rest }: IProtectedRouteProps) =>  {
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
