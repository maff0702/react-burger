import { Route, Redirect  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, ...rest }) {
    let { isAuth } = useSelector((state :any) => state.auth);
    isAuth = localStorage.getItem('accessToken');
    
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

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  rest: PropTypes.object
};
