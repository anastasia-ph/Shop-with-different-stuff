import React from "react";
import CartFullSize from "./components/CartFullSize";
import HeaderBlock from './components/HeaderBlock';
export class CartPage extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <HeaderBlock />
                <CartFullSize></CartFullSize>
            </div>
        )
    }
}