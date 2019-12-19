import React, { Fragment } from 'react';

import './App.css'

import Header from './components/header'
import Routes from './services/routes'

function App() {
  return (
    <Fragment>
      <Header />
      <Routes />
    </Fragment>
  )
}

export default App;
