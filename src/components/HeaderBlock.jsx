import React from "react";
import { GET_CATEGORIES } from "../GRAPHQL/Queries";
import store from "../store";
import { CHANGE_CATEGORY, SWITCH_CART_DROPDOWN, CHANGE_CURRENCY } from "../actions/actions";
import { switchCurrency } from "../utils/switchCurrency";
import CurrencyDropdown from './CurrencyDropdown';
import { Query } from "@apollo/client/react/components"
import CurrencyBlock from "./CurrencyBlock";
import { connect } from "react-redux";
import { switchCategory } from '../utils/switchCategory';
import CartDropdown from "./CartDropdown";
import { Navigate } from "react-router";
import $ from "jquery"





class HeaderBlock extends React.Component {

    componentDidMount() {
        const SELF = this;
        document.onclick = function (e) {
            if (SELF.state.isCurrencyBlockDisplayed === true && (e.target.className !== "currency-dropdown__item" && !$(".currency-dropdown__item").find(e.target).length)
                && (e.target.className !== "currency-block__container" && !$(".currency-block__container").find(e.target).length)) {
                SELF.setState({ isCurrencyBlockDisplayed: false })
            }

            if (SELF.props.isCartDropdown === true && (e.target.className !== "emptycart-icon-container" && !$(".emptycart-icon-container").find(e.target).length) &&
                (e.target.className !== "cart-dropdown__container" && !$("#cart_dropdown__container").find(e.target).length) &&
                (e.target.className !== "cart-dropdown__buttons_container" && !$("#cart-dropdown__buttons_container").find(e.target).length) &&
                (e.target.className !== "cart__buttons-container" && !$("#cart__buttons-container").find(e.target).length) &&
                (e.target.className !== "currency-block__container" && !$(".currency-block__container").find(e.target).length) &&
                (e.target.className !== "currency-dropdown__item" && ((e.target.className).indexOf("currency-dropdown__item") !== 0) &&
                    ((e.target.className).indexOf("currency-dropdown__text") !== 0) &&
                    !$(".currency-dropdown__item").find(e.target).length)) {
                console.log(Boolean(-1))
                console.log(e.target.className)
                SELF.props.switchCartDropdown(SELF.props.isCartDropdown)
            }
        }
    }
    componentDidUpdate() {
        store.subscribe(() => {
            localStorage.setItem("currentCategory", store.getState().categoryReducer.currentCategory)

        }
        )

    }
    constructor(props) {
        super(props);
        this.state = {
            isOnHomePage: false,
            currentCategory: localStorage.getItem("currentCategory"),
            isCurrencyBlockDisplayed: false,
            currentCurrency: localStorage.getItem("currentCurrency"),
            isCategoryChanged: false
        }



    }




    render() {
        return (
            <div className="header-block__header">
                < Query query={GET_CATEGORIES}>
                    {({ data, loading, error }) => {
                        if (loading) return <p>loading</p>
                        if (error) return <p>error</p>;
                        return (
                            <div className="header-block__categories-container">
                                {data.categories.map((e, i) => <p key={e.name} className={this.props.category !== null ? (e.name === this.props.category ? "header-block__categories selected" : "header-block__categories") : (i === 0 ? "header-block__categories selected" : "header-block__categories")} onClick={switchCategory.bind(this)} id={e.name}>{e.name}</p>)}
                            </div>
                        )
                    }}
                </Query >
                <div className="header-block__icon-container">
                    <img className="header-block__icon" src="../assets/shop_icon.svg" alt="shop icon" onClick={() => this.setState({ isOnHomePage: true })}></img>
                    {this.state.isOnHomePage && <Navigate to="/"></Navigate>}
                    {(this.state.isCategoryChanged && window.location.pathname !== "/") && <Navigate to="/" />}
                </div>
                <div className="header-block__actions-container">
                    <CurrencyBlock symbol={this.state.currentCurrency} isOpen={this.state.isCurrencyBlockDisplayed} currencySwitcher={() => this.setState({ isCurrencyBlockDisplayed: !this.state.isCurrencyBlockDisplayed })}></CurrencyBlock>

                    {this.state.isCurrencyBlockDisplayed && <CurrencyDropdown switchCurrency={switchCurrency.bind(this)}></CurrencyDropdown>}
                    {this.props.isCartDropdown && <CartDropdown itemsInCart={this.props.cart} ></CartDropdown>}

                    <div className="emptycart-icon-container" onClick={() => this.props.switchCartDropdown(this.props.isCartDropdown)}>
                        <img className="emptycart-icon" src="../assets/empty_cart.svg" alt="shop icon"></img>
                        {this.props.cart.length > 0 && <p className="cart__items-amount-icon">{this.props.amountOfItemsNumber}</p>}
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = function (state) {
    return {
        cart: state.itemsInCart.cart,
        amountOfItemsNumber: state.itemsInCart.amountOfItemsNumber,
        isCartDropdown: state.switchCartDropdown.isCartDropdown,
        category: state.categoryReducer.currentCategory
    }

}

const mapDispatchToProps = function (dispatch) {
    return {
        sendCategory: (value) => dispatch({
            "type": CHANGE_CATEGORY,
            "currentCategory": value
        }),
        switchCartDropdown: (value) => dispatch({
            "type": SWITCH_CART_DROPDOWN
            ,
            "isCartDropdown": !value

        }),
        sendCurrency: (value) => dispatch({
            type: CHANGE_CURRENCY,
            "currentCurrency": value
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock)


