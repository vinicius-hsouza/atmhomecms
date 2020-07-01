import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import MenuPrincipal from '../component/menu';
import { isAuthenticated } from '../services/auth';


function Auth({ children }) {
  return <>{children}</>;
}

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = isAuthenticated();

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = isAuthenticated() ? MenuPrincipal : Auth;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: true,
};
