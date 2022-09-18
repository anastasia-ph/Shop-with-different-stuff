import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_ATTRIBUTES_BY_ID } from "../GRAPHQL/Queries";
import { switchActivePreview } from "../utils/switchActivePreview";
import { AddToCartButton } from "./AddToCartButton"
export class PDP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentlyDisplayedName: "name",
            currentlyDisplayedPhoto: "photo"
        }
    }
    switchCurrentPreview = (e) => {
        this.setState({ currentlyDisplayedName: e.target.alt })
        this.setState({ currentlyDisplayedPhoto: e.target.src })
        switchActivePreview(e)
    }

    render() {
        return (

            <div className="pdp__container">

                <Query query={GET_ATTRIBUTES_BY_ID} variables={{ "id": this.props.id }}>
                    {({ data, error, loading }) => {
                        if (error) return <p>Error!</p>
                        if (loading) return <p>Loading...</p>
                        let usedCurrency = data.product.prices.filter((e) => e.currency.symbol == this.props.currency)
                        return (
                            <>
                                <div className="pdp__side-images-container">
                                    {data.product.gallery.map((e, i) =>
                                        <div className={i == 0 ? "pdp__images-preview-container pdp__images-preview-container_active" : "pdp__images-preview-container"} onClick={this.switchCurrentPreview.bind(this)}>
                                            <img className={data.product.name == "Jacket" ? "pdp__images-preview-jacket" : "pdp__images-preview"} src={e} alt={data.product.name} onLoad={() => this.setState({ currentlyDisplayedPhoto: data.product.gallery[0], currentlyDisplayedName: data.product.name })} />
                                        </div>)}
                                </div>
                                <div className={this.state.currentlyDisplayedName == "Jacket" ? "pdp__main-photo_container_jacket " : "pdp__main-photo_container"}>
                                    <img className={this.state.currentlyDisplayedName == "Jacket" ? "pdp__main-photo_jacket" : "pdp__main-photo"} src={this.state.currentlyDisplayedPhoto}></img>
                                </div>
                                <div className="pdp__item-description">
                                    <p className="pdp__item-brand">{data.product.brand}</p>
                                    <p className="pdp_item-name">{data.product.name}</p>
                                    <div className="attributes">
                                        {/* create html element for each attribute group name */}
                                        {data.product.attributes.map((e) => <div className="item-attributes__group">
                                            <p className="item-attribute__name">{e.name}</p>
                                            {/* and create separate html elements for each value in attributes group */}
                                            <p className="item-attribute__values">
                                                {e.items.map((item) =>
                                                    <p style={{ backgroundColor: item.value }} className={e.type == "text" ? "attribute-value__text" : (item.displayValue == "White" ? "attribute-value__color color_white-border" : "attribute-value__color")}>{e.type == "text" && item.value}</p>)}
                                            </p>
                                        </div>)}
                                        <p className="item-attribute__name">Price:</p>
                                        <div className="item-attribute__price">
                                            {usedCurrency.map((e) => <>
                                                <p className="attribute-price_price">{e.amount}</p>
                                                <p className="attribute-price_price">{e.currency.symbol}</p>
                                            </>
                                            )}
                                        </div>
                                    </div>

                                    <AddToCartButton text='Add to cart'></AddToCartButton>

                                    <div dangerouslySetInnerHTML={{ __html: data.product.description }} />

                                </div>


                            </>
                        )
                    }}
                </Query>
                {/* separate containers for Jacket items */}

            </div >
        )
    }
}