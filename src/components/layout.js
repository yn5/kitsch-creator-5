import React from 'react';
import T from 'prop-types';
import { Container } from './_styled/layout.styled';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

Layout.propTypes = {
  children: T.node.isRequired,
};

export default Layout;
