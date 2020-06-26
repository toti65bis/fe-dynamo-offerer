import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/styles/components/Layout.scss';

const Layout = ({ children }) => (
  <div className="wrapper">
    <div className="App">
        <Header />
        <div className="content">
            {children}
        </div>
    </div>
    <Footer />
  </div>
);

export default Layout;