import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestCheckAuth } from '../../store/authSlice';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
    let { user, isAuth } = useSelector((state :any) => state.auth);
    const [isUserLoaded, setUserLoaded] = useState(false);

  //   const init = async () => {
  //   // await getUser();
  //   setUserLoaded(true);
  // };

  useEffect(() => {
    if(!isAuth) dispatch(requestCheckAuth())
  }, [dispatch]);

    if (!isUserLoaded) {
    return null;
  }

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