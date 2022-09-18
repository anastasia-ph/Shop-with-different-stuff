import React from "react";
import { GET_CATEGORIES } from "../GRAPHQL/Queries";
import { Query } from "@apollo/client/react/components"
import { CurrencyBlock } from "./CurrencyBlock";



export class HeaderBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: localStorage.getItem("currentCategory") }

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
                                {data.categories.map((e, i) => <p className={this.state.selected != null ? (e.name == this.state.selected ? "header-block__categories selected" : "header-block__categories") : (i == 0 ? "header-block__categories selected" : "header-block__categories")} onClick={this.props.switchCategory} id={e.name}>{e.name}</p>)}
                            </div>
                        )
                    }}
                </Query >
                <div className="header-block__icon-container">
                    <img className="header-block__icon" src="./assets/shop_icon.svg" alt="shop icon"></img>
                </div>
                <div className="header-block__actions-container">
                    <CurrencyBlock symbol={this.props.symbol} currencySwitcher={this.props.currencySwitcher}></CurrencyBlock>
                    <div className="emptycart-icon-container">
                        <img className="emptycart-icon" src="./assets/empty_cart.svg" alt="shop icon"></img>
                        {this.props.itemsInCart > 0 && <p className="cart__items-amount-icon">{this.props.itemsInCart}</p>}
                    </div>
                </div>
            </div>

        )
    }

}


