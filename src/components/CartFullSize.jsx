import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_PRODUCTS_BY_ID } from "../GRAPHQL/Queries";
import { COUNT_TOTAL, INCREASE_AMOUNT_OF_ITEM, DECREASE_AMOUNT_OF_ITEM, SWITCH_CART_DROPDOWN, SIMULATE_PURCHASE } from "../actions/actions";
import { connect } from "react-redux";
import { round } from "mathjs";
import { changeAmountOfItem } from "../utils/changeAmountOfItem";
import { countTotalAmount } from "../utils/countTotalAmountCart";
import { simulatePurchase } from "../utils/simulatePurchase";
import { changePreviewInCartCarousel } from "../utils/changePreviewInCartCarousel";




class CartFullSize extends React.Component {

    constructor(props) {
        super(props);
        this.arr = []
        this.state = {
            isChangePreview: false,
            idForCarousel: undefined,
            currentEvent: undefined
        }
    }
    componentDidMount() {
        this.props.switchCartDropdown(true)
        window.addEventListener("load", countTotalAmount())

    }
    componentDidUpdate() {
        countTotalAmount()
    }

    changePreviewState(e) {
        let parentClassName = e.target.parentNode.className.split(' ')[1]
        this.setState({ currentEvent: e, idForCarousel: document.querySelector(`.${parentClassName}`).previousElementSibling.alt, isChangePreview: true })
    }


    render() {
        return (

            <div className="fullsize-cart__wrapper" >
                <p className="fullsize-cart__title">Cart</p>
                <div className="fullsize-cart__items-wrapper">
                    {this.props.itemsInCart.length > 0 ? this.props.itemsInCart.map((element) => <Query query={GET_PRODUCTS_BY_ID} variables={{ "id": element.id }}>

                        {({ data, error, loading }) => {

                            if (error) return <p>Error!</p>
                            if (loading) return <p>Loading...</p>
                            let usedCurrency = Object.keys(data).map((item) => data[item].prices.filter((price) => price.currency.symbol === this.props.currentCurrency))
                            usedCurrency = usedCurrency[0]
                            return (

                                <>
                                    {Object.keys(data).map((item) =>

                                        <div className="fullsize-cart__items-container" key={`${element.unique_key}-fullsize`} id={`${element.unique_key}-fullsize`}>

                                            <div className="fullsize-cart__item-left-container" >
                                                <p className="fullsize-cart__item-brand">{data[item].brand}</p>
                                                <p className="fullsize-cart__item-title">{data[item].name}</p>
                                                <p className="fullsize-cart__item-price" >{round(usedCurrency[0].amount * element.amount, 2)}{usedCurrency[0].currency.symbol}</p>

                                                <div className="cart-item-dropdown__attributes">
                                                    {/* create html element for each attribute group name */}
                                                    {data[item].attributes.map((attribute) => <div key={attribute.name} className="fullsize-cart__item-attributes__group">
                                                        <p className="item-attribute__name">{attribute.name}</p>
                                                        {/* and create separate html elements for each value in attributes group */}
                                                        <div className="item-attribute__values" >
                                                            {attribute.items.map((item, i) =>
                                                                <p key={i} style={{ backgroundColor: item.value }} id={`${attribute.name}-${i}-${item.value}preview`}
                                                                    className={attribute.type === "text" ?
                                                                        (Object.keys(element).map((value) => attribute.name === value && item.value === element[value]).indexOf(true) !== -1 ? "attribute-value__text_no-hover attribute-value__text_selected" : "attribute-value__text_no-hover")
                                                                        :
                                                                        (Object.keys(element).map((value) => attribute.name === value && item.value === element[value]).indexOf(true) !== -1 ? "attribute-value__color_no-hover attribute-value__color_selected " :
                                                                            (item.displayValue === "White" ? "attribute-value__color_no-hover color_white-border_no-hover" : "attribute-value__color_no-hover")
                                                                        )}
                                                                >{attribute.type === "text" && item.value}</p>)}
                                                        </div>
                                                    </div>)}

                                                </div>
                                            </div>
                                            <div className={"fullsize-cart__item-right-container"}>
                                                <div className="cart__buttons-container">
                                                    <p className="buttons-container__amount-button" onClick={changeAmountOfItem.bind(this)}>+</p>
                                                    <p className="buttons-container__amount" >{element.amount}</p>
                                                    <p className="buttons-container__amount-button" onClick={changeAmountOfItem.bind(this)}>-</p>
                                                </div>
                                                <div className={data[item].name === "Jacket" ? "fullsize-cart__image-container_jacket" : "fullsize-cart__image-container"}>
                                                    <img className={data[item].name === "Jacket" ? "fullsize-cart__image_jacket" : "fullsize-cart__image"} src={data[item].gallery[0]} alt={element.id}></img>
                                                    {data[item].gallery.length > 0 &&
                                                        <div className={`cart__carousel-buttons-container carousel-buttons-container-${element.id}`}>
                                                            <img className="carousel-buttons-container__button" src="./assets/carousel_previous_button.svg" alt="carousel previous button" onClick={(e) => this.changePreviewState(e)}></img>
                                                            <img className="carousel-buttons-container__button" src="./assets/carousel_next_button.svg" alt="carousel next button" onClick={(e) => this.changePreviewState(e)}></img>
                                                        </div>}
                                                </div>
                                            </div>


                                        </div>
                                    )}
                                </>
                            )
                        }}
                    </Query>) : <p className="fullsize-cart__items-wrapper_empty-cart total-block__item" >No items here yet...</p>}


                </div>
                <div className="fullsize-cart__total-block_wrapper">
                    <div className="total-block__items-wrapper">
                        <p className="total-block__item">Tax 21%: </p>
                        <p className="total-block__value value__tax"></p>
                    </div>
                    <div className="total-block__items-wrapper">
                        <p className="total-block__item">Quantity: </p>
                        <p className="total-block__value">{this.props.amountOfItems}</p>
                    </div>
                    <div className="total-block__items-wrapper">
                        <p className="total-block__item">Total: </p>
                        <p className="total-block__value value__total-price"></p>
                    </div>

                    <div className={this.props.itemsInCart.length > 0 ? "total-block__order-button" : "total-block__order-button_inactive"} onClick={this.props.itemsInCart.length > 0 ? simulatePurchase.bind(this) : undefined}>order</div>
                </div>

                {this.state.isChangePreview && <Query query={GET_PRODUCTS_BY_ID} variables={{ "id": this.state.idForCarousel }}>
                    {({ data, error, loading }) => {

                        if (error) return <p>Error!</p>
                        if (loading) return <p>Loading...</p>
                        return (
                            changePreviewInCartCarousel.bind(this)(this.state.currentEvent, data.product.gallery)
                        )
                    }}
                </Query>}
            </div>

        )
    }
}
const mapStateToProps = function (state) {
    return {
        itemsInCart: state.itemsInCart.cart,
        isCartDropdown: state.switchCartDropdown.isCartDropdown,

        amountOfItems: state.itemsInCart.amountOfItemsNumber,
        total: state.itemsInCart.totalAmount,
        currentCurrency: state.currencyReducer.currentCurrency
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        switchCartDropdown: (value) => dispatch({
            "type": SWITCH_CART_DROPDOWN
            ,
            "isCartDropdown": !value

        }),
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
export default connect(mapStateToProps, mapDispatchToProps)(CartFullSize)