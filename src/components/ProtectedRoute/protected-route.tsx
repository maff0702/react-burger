import { Route, Redirect  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
    let { isAuth } = useSelector((state :any) => state.auth);
    isAuth = localStorage.getItem('accessToken')
        
    return (
    <Route
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
  );
} 