import { Query } from "@apollo/client/react/components"
import React from "react";
import { GET_PRODUCTS_BY_ID } from "../GRAPHQL/Queries";
import { COUNT_TOTAL, INCREASE_AMOUNT_OF_ITEM, DECREASE_AMOUNT_OF_ITEM, SIMULATE_PURCHASE } from "../actions/actions";
import { connect } from "react-redux";
import { round } from "mathjs";
import { changeAmountOfItem } from "../utils/changeAmountOfItem";
import { Navigate } from "react-router";
import { countTotalAmount } from "../utils/countTotalAmountDropdown";
import { simulatePurchase } from "../utils/simulatePurchase";


class CartDropdown extends React.Component {

    componentDidMount() {
        window.addEventListener("load", countTotalAmount())

    }
    componentDidUpdate() {
        countTotalAmount()
    }

    constructor(props) {
        super(props);
        this.state = {
            isCartPageOpen: false
        }
    }

    setIsCartPageOpen = () => {
        this.setState({ isCartPageOpen: true })
    }


    render() {
        let arr = []
        return (
            <div className="cart-dropdown__container">
                <div className="cart-dropdown__title">
                    <p className="cart-dropdown__title-text">My Bag,  </p>
                    <p className="cart-dropdown__title-value" >{this.props.amountOfItems !== "undefined" ? this.props.amountOfItems : 0} {(this.props.amountOfItems === 1) ? "item" : "items"}</p>
                </div>
                <div className="cart-item-dropdown__container">
                    {this.props.itemsInCart.length > 0 ? this.props.itemsInCart.map((element) => <Query query={GET_PRODUCTS_BY_ID} variables={{ "id": element.id }}>

                        {({ data, error, loading }) => {


                            if (error) return <p>Error!</p>
                            if (loading) return <p>Loading...</p>

                            let usedCurrency = Object.keys(data).map((item) => data[item].prices.filter((price) => price.currency.symbol === this.props.currentCurrency))
                            usedCurrency = usedCurrency[0]
                            arr.push(round(usedCurrency[0].amount * element.amount, 2))
                            // this.props.countTotalAmount(result)


                            return (

                                <>
                                    {Object.keys(data).map((item) =>

                                        <div key={element.unique_key} className="cart-item__container" id={element.unique_key}>

                                            <div className="cart-item-dropdown__product-container" >
                                                <p className="cart-item-dropdown__product-brand">{data[item].brand}</p>
                                                <p className="cart-item-dropdown__product-title">{data[item].name}</p>
                                                <p className="cart-item-dropdown__product-price" >{round(usedCurrency[0].amount * element.amount, 2)}{usedCurrency[0].currency.symbol}</p>

                                                <div className="cart-item-dropdown__attributes">
                                                    {/* create html element for each attribute group name */}
                                                    {data[item].attributes.map((attribute) => <div key={attribute.name} className="cart-item-attributes__group">
                                                        <p className="item-dropdown-attribute__name">{attribute.name}</p>
                                                        {/* and create separate html elements for each value in attributes group */}
                                                        <div className="item-dropdown-attribute__values">


                                                            {attribute.items.map((item, i) =>

                                                                <p key={i} style={{ backgroundColor: item.value }} id={`${attribute.name}-${i}-${item.value}preview`}

                                                                    className={attribute.type === "text" ?
                                                                        //compare both value and keys as some values might be similar so the key is additional property to differentiate them
                                                                        (Object.keys(element).map((value) => attribute.name === value && item.value === element[value]).indexOf(true) !== -1 ? "item-dropdown-attribute-value__text item-dropdown__value-text_selected" : "item-dropdown-attribute-value__text")
                                                                        :
                                                                        (Object.keys(element).map((value) => attribute.name === value && item.value === element[value]).indexOf(true) !== -1 ? "item-dropdown-attribute-value__color item-dropdown__value-color_selected" :
                                                                            (item.displayValue === "White" ? "item-dropdown-attribute-value__color value-color_white-border" : "item-dropdown-attribute-value__color")
                                                                        )}
                                                                >{attribute.type === "text" && item.value}</p>)}
                                                        </div>
                                                    </div>)}

                                                </div>
                                            </div>
                                            <div className="cart__buttons-container">
                                                <p className="buttons-container__amount-button" onClick={changeAmountOfItem.bind(this)}>+</p>
                                                <p className="buttons-container__amount">{element.amount}</p>
                                                <p className="buttons-container__amount-button" onClick={changeAmountOfItem.bind(this)}>-</p>
                                            </div>
                                            <div className="cart-item-dropdown__image-container">
                                                <img className="cart-item-dropdown__image" src={data[item].gallery[0]} alt="item"></img>
                                            </div>

                                        </div>
                                    )}
                                </>
                            )
                        }}
                    </Query>) : <p className="cart-item-dropdown__product-brand">No items here yet..</p>}
                </div>
                <div className="cart-dropdown__total-container" >
                    <p className="cart-dropdown__total-text">Total</p>
                    <p id="total-amount" className="cart-dropdown__total-value"></p>
                </div>
                <div className="cart-dropdown__buttons_container">
                    <div className="cart-dropdown__view-bag_button" onClick={this.setIsCartPageOpen}>View Bag</div>
                    {(this.state.isCartPageOpen && window.location.pathname !== "/cart") && <Navigate to="/cart" />}
                    <div className={this.props.itemsInCart.length > 0 ? "cart-dropdown__checkout_button" : "cart-dropdown__checkout_button_inactive"} onClick={this.props.itemsInCart.length > 0 ? simulatePurchase.bind(this) : undefined}>Check out</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = function (state) {
    return {
        itemsInCart: state.itemsInCart.cart,

        amountOfItems: state.itemsInCart.amountOfItemsNumber,
        total: state.itemsInCart.totalAmount,
        currentCurrency: state.currencyReducer.currentCurrency
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        increaseAmountOfItem: (value) => dispatch({
            "type": INCREASE_AMOUNT_OF_ITEM,
            "unique_key": value,

        }),
        decreaseAmountOfItem: (value) => dispatch({
            "type": DECREASE_AMOUNT_OF_ITEM,
            "unique_key": value,

        }),
        countTotalAmount: (value) => dispatch({
            "type": COUNT_TOTAL,
            "totalAmount": value

        }),
        simulatePurchase: () => dispatch({
            "type": SIMULATE_PURCHASE

        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown)