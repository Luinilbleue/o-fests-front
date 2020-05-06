// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// == Import : local
import App from 'src/components/App';
import store from 'src/store';
import { setCurrentUser } from 'src/store/reducer';
import jwt from 'jsonwebtoken';


if (localStorage.token) {
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

// == Render
// 1. Le composant racine (celui qui contient l'ensemble de l'app)
const rootComponent = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');

// Le rendu de React => DOM
render(rootComponent, target);
