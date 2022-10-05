import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { Provider } from 'react-redux';
import store from './store';
import { ProductDescriptionPage } from './PDP';
import { CartPage } from './CartPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

//add behaviour if error occurs
const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="product" element={<ProductDescriptionPage />} />
          <Route path="cart" element={<CartPage />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
