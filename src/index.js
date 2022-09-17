import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

root.render(

  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} />

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();