import React from "react";
import { GET_CATEGORIES } from "../GRAPHQL/Queries";
import store from "../store";
import { CHANGE_CATEGORY } from "../actions/actions";
import { SWITCH_CART_DROPDOWN } from "../actions/actions";
import { Query } from "@apollo/client/react/components"
import { CurrencyBlock } from "./CurrencyBlock";
import { connect } from "react-redux";
import { switchCategory } from '../utils/switchCategory';
import CartDropdown from "./CartDropdown";




class HeaderBlock extends React.Component {

    componentDidUpdate() {
        store.subscribe(() => {
            localStorage.setItem("currentCategory", store.getState().categoryReducer.currentCategory)
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: localStorage.getItem("currentCategory"),
            isShopDropdownDisplayed: false
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
                                {data.categories.map((e, i) => <p key={e.name} className={this.props.currentCategory != null ? (e.name == this.props.currentCategory ? "header-block__categories selected" : "header-block__categories") : (i == 0 ? "header-block__categories selected" : "header-block__categories")} onClick={switchCategory.bind(this)} id={e.name}>{e.name}</p>)}
                            </div>
                        )
                    }}
                </Query >
                <div className="header-block__icon-container">
                    <img className="header-block__icon" src="./assets/shop_icon.svg" alt="shop icon"></img>
                </div>
                <div className="header-block__actions-container">
                    <CurrencyBlock symbol={this.props.symbol} currencySwitcher={this.props.currencySwitcher}></CurrencyBlock>
                    {this.props.isCartDropdown && <CartDropdown itemsInCart={this.props.cart} ></CartDropdown>}
                    <div className="emptycart-icon-container" onClick={() => this.props.switchCartDropdown(this.props.isCartDropdown)}>
                        <img className="emptycart-icon" src="./assets/empty_cart.svg" alt="shop icon"></img>
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
        isCartDropdown: state.switchCartDropdown.isCartDropdown
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

        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock)


