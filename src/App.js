import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Header from './component/Header';
import Router from './component/Router';
import Footer from './component/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;