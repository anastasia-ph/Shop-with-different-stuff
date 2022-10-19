import React from "react";

import { connect } from "react-redux";


class CurrencyBlock extends React.Component {
    render() {
        return (
            <div className="currency-block__container" onClick={this.props.currencySwitcher}>
                <p className="currency-block__symbol">{this.props.currentCurrency}</p>
                <div className="currency-block__arrow-icon-container">
                    <img className="arrow-icon-container__arrow-icon" src={this.props.isOpen ? "../assets/close_currencies.svg" : "../assets/expand_currencies.svg"} alt="shop icon"></img>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        currentCurrency: state.currencyReducer.currentCurrency

    }
}
export default connect(mapStateToProps, undefined)(CurrencyBlock)