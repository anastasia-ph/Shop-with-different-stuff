import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client';
import "./style/main.css"
import { onError } from '@apollo/client/link/error'
import React from 'react';
import HeaderBlock from './components/HeaderBlock';
import ProductsBlock from './components/ProductsBlock';
import { GET_CATEGORIES } from "./GRAPHQL/Queries";
import { GET_CURRENCIES } from './GRAPHQL/Queries';
import { Query } from "@apollo/client/react/components"

import { addToCartFromCartIcon } from './utils/addToCartFromCartIcon';
import { connect } from 'react-redux';
import { CHANGE_CATEGORY, CHANGE_CURRENCY } from "./actions/actions";
import store from "./store";




//add behaviour if error occurs
const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`)
    })
  }
})
// link to the endpoint
const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })])
//setup client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export class App extends React.Component {
  state = {
    currentCategory: localStorage.getItem("currentCategory"),
    isCurrencyBlockDisplayed: false,
    itemsInCart: 0
  }

  render() {

    return (

      <ApolloProvider client={client}>
        < Query query={GET_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;
            {
              // on this stage we initialize current categorie value to use it later withing components with redux
              {
                console.log(store.getState())
                !localStorage.getItem("currentCategory") &&
                  localStorage.setItem("currentCategory", data.categories[0].name)
                this.props.sendCategory(localStorage.getItem("currentCategory"))

              }
            }

          }}
        </Query >
        < Query query={GET_CURRENCIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;
            if (!localStorage.getItem("currentCurrency")) {
              localStorage.setItem("currentCurrency", data.currencies[0].symbol);
              this.props.sendCurrency(localStorage.getItem("currentCurrency"))
            }
          }}
        </Query >

        <div className="wrapper">
          <HeaderBlock itemsInCart={this.state.itemsInCart}  ></HeaderBlock>
          <ProductsBlock currency={this.state.currentCurrency} category={this.state.currentCategory} addToCart={addToCartFromCartIcon.bind(this)}></ProductsBlock>
        </div>
      </ApolloProvider >

    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    sendCategory: (value) => dispatch({
      "type": CHANGE_CATEGORY,
      "currentCategory": value
    }),
    sendCurrency: (value) => dispatch({
      type: CHANGE_CURRENCY,
      "currentCurrency": value
    })
  }
}


export default connect(null, mapDispatchToProps)(App);
