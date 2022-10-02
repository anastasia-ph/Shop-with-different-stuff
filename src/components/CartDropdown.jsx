import { Query } from "@apollo/client/react/components"
import React from "react";
import { GET_ATTRIBUTES_BY_ID } from "../GRAPHQL/Queries";
import { INCREASE_AMOUNT_OF_ITEM } from "../actions/actions";
import { DECREASE_AMOUNT_OF_ITEM } from "../actions/actions";
import { connect } from "react-redux";
import { round } from "mathjs";
import { changeAmountOfItem } from "../utils/changeAmountOfItem";


class CartDropdown extends React.Component {



    constructor(props) {
        super(props);


    }
    // increaseTotalAmount(arr) {
    //     let sumUpAmount = arr.reduce((a, b) => a + b, 1)
    //     document.getElementById("total-amount").innerHTML = `${round(sumUpAmount, 2)}${this.props.currentCurrency}`

    // }

    render() {
        let arr = []
        return (
            <div className="cart-dropdown__container">
                <div className="cart-dropdown__title">
                    <p className="cart-dropdown__title-text">My Bag,  </p>
                    <p className="cart-dropdown__title-value" >{this.props.amountOfItems != "undefined" ? this.props.amountOfItems : 0} {(this.props.amountOfItems === 1) ? "item" : "items"}</p>
                </div>
                <div className="cart-item-dropdown__container">
                    {this.props.itemsInCart.map((element) => <Query query={GET_ATTRIBUTES_BY_ID} variables={{ "id": element.id }}>

                        {({ data, error, loading }) => {


                            if (error) return <p>Error!</p>
                            if (loading) return <p>Loading...</p>

                            let usedCurrency = Object.keys(data).map((item) => data[item].prices.filter((price) => price.currency.symbol == this.props.currentCurrency))
                            usedCurrency = usedCurrency[0]
                            arr.push(round(usedCurrency[0].amount * element.amount, 2))

                            return (

                                <>
                                    {Object.keys(data).map((item) =>

                                        <div className="cart-item__container" id={element.unique_key}>

                                            <div className="cart-item-dropdown__product-container" >
                                                <p className="cart-item-dropdown__product-brand">{data[item].brand}</p>
                                                <p className="cart-item-dropdown__product-title">{data[item].name}</p>
                                                <p className="cart-item-dropdown__product-price" >{round(usedCurrency[0].amount * element.amount, 2)}{usedCurrency[0].currency.symbol}</p>

                                                <div className="cart-item-dropdown__attributes">
                                                    {/* create html element for each attribute group name */}
                                                    {data[item].attributes.map((attribute) => <div key={attribute.name} className="item-attributes__group">
                                                        <p className="item-dropdown-attribute__name">{attribute.name}</p>
                                                        {/* and create separate html elements for each value in attributes group */}
                                                        <div className="item-dropdown-attribute__values">
                                                            {attribute.items.map((item, i) =>
                                                                <p key={i} style={{ backgroundColor: item.value }} id={`${attribute.name}-${i}-${item.value}preview`}
                                                                    className={attribute.type === "text" ?
                                                                        (Object.values(element).map((value) => (item.value === value)).indexOf(true) != -1 ? "item-dropdown-attribute-value__text item-dropdown__value-text_selected" : "item-dropdown-attribute-value__text")
                                                                        :
                                                                        (Object.values(element).map((value) => (item.value === value)).indexOf(true) != -1 ? "item-dropdown-attribute-value__color item-dropdown__value-color_selected" :
                                                                            (item.displayValue === "White" ? "item-dropdown-attribute-value__color color_white-border" : "item-dropdown-attribute-value__color")
                                                                        )}
                                                                >{attribute.type === "text" && item.value}</p>)}
                                                        </div>
                                                    </div>)}

                                                </div>
                                            </div>
                                            <div className="cart-item-dropdown__buttons-container">
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
                                // <CartItemDropdown dataForCarts={data}></CartItemDropdown>
                            )
                        }}
                    </Query>)}
                </div>
                <div className="cart-dropdown__total-container">
                    <p className="cart-dropdown__total-text">Total</p>
                    <p id="total-amount" className="cart-dropdown__total-value"></p>
                </div>
                <div className="cart-dropdown__buttons_container">
                    <div className="cart-dropdown__view-bag_button">View Bag</div>
                    <div className="cart-dropdown__checkout_button">Check out</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = function (state) {
    return {
        amountOfItems: state.itemsInCart.amountOfItemsNumber,

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

        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown)