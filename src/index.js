import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/client/Home';
import Register from './pages/client/Register';
import Dashboard from './pages/client/Dashboard';
import Product from './pages/client/Product';
import Cart from './pages/client/Cart';
import Shipping from './pages/client/Shipping';
import CheckOut from './pages/client/CheckOut';
import Purchases from './pages/client/Purchases';
import AddProduct from './pages/admin/AddProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import AllPurchases from './pages/admin/AllPurchases';
import * as serviceWorker from './serviceWorker';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './common/reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  persistedReducer,
  enhancers
)

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Route exact path = "/" component = {Home} />
            <Route path = "/register" component = {Register} />
            <Route path = "/dashboard" component = {Dashboard} />
            <Route path = "/product/:productId" component = {Product} />
            <Route path = "/cart" component = {Cart} />
            <Route path = "/shipping" component = {Shipping} />
            <Route path = "/checkout" component = {CheckOut} />
            <Route path = "/purchases" component = {Purchases} />
            <Route path = "/addProduct" component = {AddProduct} />
            <Route path = "/updateProduct/:productId" component = {UpdateProduct} />
            <Route path = "/allpurchases" component = {AllPurchases} />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
