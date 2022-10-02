import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_PRODUCTS_BY_CATEGORY } from "../GRAPHQL/Queries";
import { ProductCard } from "./ProductCard";
import PDP from "./ProductDescriptionPage";
import { connect } from "react-redux";

class ProductsBlock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openPDP: false,
            id: "id"
        }
    }

    onClickCard = (e) => {
        this.setState({ openPDP: !this.state.openPDP, id: e.currentTarget.id })

    }






    render() {
        return (
            <>
                <div className="products-block__container">
                    {this.props.isCartDropdown && <div className="products-block__container_inactive-state"></div>}

                    <p className="products-block__category">{this.props.currentCategory}</p>
                    <div className="products-block__items">
                        <Query query={GET_PRODUCTS_BY_CATEGORY} variables={{ "title": this.props.currentCategory }}>

                            {({ data, error, loading }) => {
                                if (error) return <p>Error!</p>
                                if (loading) return <p>Loading...</p>
                                // select one specific price symbol of which matches currently selected currency value
                                let usedCurrency = data.category.products.map((e, i) => e.prices.filter((price) => price.currency.symbol == this.props.currentCurrency))

                                return (
                                    <>
                                        {data.category.products.map((e, i) => <ProductCard src={e.gallery[0]} key={e.name} id={e.id} inStock={e.inStock} name={e.name} price={usedCurrency[i][0].amount} symbol={usedCurrency[i][0].currency.symbol} onClick={this.onClickCard} addToCart={this.props.addToCart}></ProductCard>)}
                                    </>
                                )
                            }
                            }
                        </Query>

                    </div>
                    {this.state.openPDP && <PDP id={this.state.id} currency={this.props.currency}></PDP>}
                </div>
            </>
        )
    }
}
const mapStateToProps = function (state) {
    return {
        currentCategory: state.categoryReducer.currentCategory,
        currentCurrency: state.currencyReducer.currentCurrency,

        isCartDropdown: state.switchCartDropdown.isCartDropdown


    }
}
export default connect(mapStateToProps)(ProductsBlock)