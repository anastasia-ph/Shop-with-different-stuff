import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_PRODUCTS_BY_ID } from "../GRAPHQL/Queries";
import { switchActivePreview } from "../utils/switchActivePreview";
import { AddToCartButton } from "./AddToCartButton"
import { ADD_NEW_TO_CART, UPDATE_AMOUNT_OF_ITEM } from "../actions/actions"
import { connect } from "react-redux";
import { addToCart } from "../utils/addToCart";
import $ from "jquery"


class PDP extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            currentlyDisplayedName: "name",
            currentlyDisplayedPhoto: "photo",
            amountOfItemsNumber: 0
        }
    }
    switchCurrentPreview = (e) => {
        this.setState({ currentlyDisplayedName: e.target.alt })
        this.setState({ currentlyDisplayedPhoto: e.target.src })
        switchActivePreview(e)
    }
    selectAttribute(e) {
        if (e.target.innerHTML === "") {
            let collection = document.getElementsByClassName("value-color__selected")

            if (collection.length > 0) {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].id.substring(0, collection[i].id.indexOf("-")) === e.target.id.substring(0, e.target.id.indexOf("-"))) {
                        collection[i].classList.remove("value-color__selected")
                    }
                }
                document.getElementById(e.target.id).classList.add("value-color__selected")
            }
            else {
                document.getElementById(e.target.id).classList.add("value-color__selected")
            }

        }
        else {
            let collection = document.getElementsByClassName("value-text__selected")
            if (collection.length > 0) {
                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].id.substring(0, collection[i].id.indexOf("-")) === e.target.id.substring(0, e.target.id.indexOf("-"))) {
                        collection[i].classList.remove("value-text__selected")
                    }
                }
                document.getElementById(e.target.id).classList.add("value-text__selected")
            }
            else {
                document.getElementById(e.target.id).classList.add("value-text__selected")
            }
        }

    }

    setDescription(description) {
        $('#item_description').html(description)
    }
    render() {
        return (

            <div className="pdp__container">
                <div className="pdp__container-padding">
                    {this.props.isCartDropdown && <div className="products-block__container_inactive-state"></div>}

                    <Query query={GET_PRODUCTS_BY_ID} variables={{ "id": this.props.id }}>
                        {({ data, error, loading }) => {
                            if (error) return <p>Error!</p>
                            if (loading) return <p>Loading...</p>
                            let usedCurrency = data.product.prices.filter((e) => e.currency.symbol === this.props.currentCurrency)
                            return (
                                <>
                                    <div className="pdp__side-images-container">
                                        {data.product.gallery.map((e, i) =>
                                            <div key={i} className={i === 0 ? "pdp__images-preview-container pdp__images-preview-container_active" : "pdp__images-preview-container"} onClick={this.switchCurrentPreview.bind(this)}>

                                                <img className={data.product.inStock ? (data.product.name === "Jacket" ? "pdp__images-preview-jacket" : "pdp__images-preview") : (data.product.name === "Jacket" ? "pdp__images-preview-jacket product-card__image-outofstock" : "pdp__images-preview product-card__image-outofstock")} src={e} alt={data.product.name} onLoad={() => this.setState({ currentlyDisplayedPhoto: data.product.gallery[0], currentlyDisplayedName: data.product.name })} />
                                                {/* maybe inerit for this below?? */}
                                            </div>)}
                                    </div>
                                    <div className="pdp__main-photo_container">
                                        <img className={data.product.inStock ? (this.state.currentlyDisplayedName === "Jacket" ? "pdp__main-photo_jacket" : "pdp__main-photo") : (this.state.currentlyDisplayedName === "Jacket" ? "pdp__main-photo_jacket product-card__image-outofstock" : "pdp__main-photo product-card__image-outofstock")} src={this.state.currentlyDisplayedPhoto} alt={data.product.name}></img>
                                        {!data.product.inStock && <p className="product_card__outofstock-text">Out of stock</p>}
                                    </div>
                                    <div className="pdp__item-description">
                                        <p className="pdp__item-brand">{data.product.brand}</p>
                                        <p className="pdp_item-title">{data.product.name}</p>
                                        <div className="attributes">
                                            {/* create html element for each attribute group name */}
                                            {data.product.attributes.map((e) => <div key={e.name} className="item-attributes__group">
                                                <p className="item-attribute__name">{e.name}</p>
                                                {/* and create separate html elements for each value in attributes group */}
                                                <div className="item-attribute__values">
                                                    {e.items.map((item, i) =>
                                                        <p key={i} style={{ backgroundColor: item.value }} id={`${e.name}-${i}-${item.value}`}
                                                            className={data.product.inStock ? (e.type === "text" ? "attribute-value__text" : (item.displayValue === "White" ? "attribute-value__color color_white-border" : "attribute-value__color")) :
                                                                (e.type === "text" ? "attribute-value__text_out-of-stock" : (item.displayValue === "White" ? "attribute-value__color_out-of-stock color_white-border" : "attribute-value__color_out-of-stock"))}
                                                            onClick={data.product.inStock ? this.selectAttribute : undefined}>{e.type === "text" && item.value}</p>)}
                                                </div>
                                            </div>)}
                                            <p className="item-attribute__name">Price:</p>
                                            <div className="item-attribute__price">
                                                {usedCurrency.map((e) => <>
                                                    <p key={e.amount} className="attribute-price_price">{e.amount}</p>
                                                    <p key={e.currency.symbol} className="attribute-price_price">{e.currency.symbol}</p>
                                                </>
                                                )}
                                            </div>
                                        </div>
                                        <p id="attribute-not-set" className="pdp__item_warning"></p>

                                        <AddToCartButton onClick={addToCart.bind(this)} text='Add to cart' inStock={data.product.inStock} parameters={this.props.id}></AddToCartButton>
                                        <div id="item_description" onLoad={this.setDescription(data.product.description)}>
                                        </div>

                                    </div>


                                </>
                            )
                        }}
                    </Query>
                    {/* separate containers for Jacket items */}


                </div >
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        cart: state.cart,
        currentCurrency: state.currencyReducer.currentCurrency,
        id: state.setID.id,
        isCartDropdown: state.switchCartDropdown.isCartDropdown,


    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        sendItemToCart: (value, amountOfItemsNumber) => dispatch({
            "type": ADD_NEW_TO_CART,
            "cart": value,
            "amountOfItemsNumber": amountOfItemsNumber
        }),
        updateAmountInCart: (value, amountOfItemsNumber) => dispatch({
            "type": UPDATE_AMOUNT_OF_ITEM,
            "i": value,
            "amountOfItemsNumber": amountOfItemsNumber
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PDP)


