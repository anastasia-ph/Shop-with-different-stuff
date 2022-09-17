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
import { HeaderBlock } from './components/HeaderBlock';
import { ProductsBlock } from './components/ProductsBlock';
import { GET_CATEGORIES } from "./GRAPHQL/Queries";
import { GET_CURRENCIES } from './GRAPHQL/Queries';
import { Query } from "@apollo/client/react/components"
import { switchCategory } from './utils/switchCategory';
import { switchCurrency } from "./utils/switchCurrency";
import { CurrencyDropdown } from './components/CurrencyDropdown';


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
    Displayed: false,
    currentCurrency: localStorage.getItem("currentCurrency")
  }

  render() {

    return (

      <ApolloProvider client={client}>
        < Query query={GET_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;
            if (!localStorage.getItem("currentCategory")) {
              localStorage.setItem("currentCategory", data.categories[0].name);
              this.setState({ currentCategory: localStorage.getItem("currentCategory") })
            }

          }}
        </Query >
        < Query query={GET_CURRENCIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;
            if (!localStorage.getItem("currentCurrency")) {
              localStorage.setItem("currentCurrency", data.currencies[0].symbol);
              this.setState({ currentCurrency: data.currencies[0].symbol })
            }
          }}
        </Query >

        <div className="wrapper">
          <HeaderBlock switchCategory={switchCategory.bind(this)} symbol={this.state.currentCurrency} currencySwitcher={() => this.setState({ Displayed: !this.state.Displayed })}></HeaderBlock>
          {this.state.Displayed && <CurrencyDropdown switchCurrency={switchCurrency.bind(this)}></CurrencyDropdown>}
          <ProductsBlock category={this.state.currentCategory}></ProductsBlock>
        </div>
      </ApolloProvider >

    )
  }
}



export default App;
