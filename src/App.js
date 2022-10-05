
import "./style/main.css"
import React from 'react';
import HeaderBlock from './components/HeaderBlock';
import ProductsBlock from './components/ProductsBlock';
import { GET_CURRENCIES, GET_CATEGORIES } from './GRAPHQL/Queries';
import { Query } from "@apollo/client/react/components"
import { connect } from 'react-redux';
import { CHANGE_CATEGORY, CHANGE_CURRENCY, SWITCH_CART_DROPDOWN } from "./actions/actions";




class App extends React.Component {
  componentDidMount() {
    this.props.switchCartDropdown(true)

  }
  state = {
    currentCategory: localStorage.getItem("currentCategory"),
    isCurrencyBlockDisplayed: false,
    itemsInCart: 0
  }

  render() {

    return (

      <div>
        < Query query={GET_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;

            // on this stage we initialize current categorie value to use it later withing components with redux

            if (!localStorage.getItem("currentCategory")) {
              localStorage.setItem("currentCategory", data.categories[0].name)
              this.props.sendCategory(localStorage.getItem("currentCategory"))


            }


          }}
        </Query >
        < Query query={GET_CURRENCIES}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>
            if (error) return <p>error</p>;
            if (!localStorage.getItem("currentCurrency")) {
              localStorage.setItem("currentCurrency", data.currencies[0].symbol);
              this.props.sendCurrency(data.currencies[0].symbol)
            }
          }}
        </Query >

        <div className="wrapper">
          <HeaderBlock itemsInCart={this.state.itemsInCart}  ></HeaderBlock>
          <ProductsBlock currency={this.state.currentCurrency} category={this.state.currentCategory}></ProductsBlock>
        </div>
      </div >

    )
  }
}
const mapStateToProps = function (state) {
  return {
    isCartDropdown: state.switchCartDropdown.isCartDropdown,

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
    }),
    switchCartDropdown: (value) => dispatch({
      "type": SWITCH_CART_DROPDOWN
      ,
      "isCartDropdown": !value

    }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
