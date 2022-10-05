import React from "react";
import { GET_CURRENCIES } from "../GRAPHQL/Queries";
import { Query } from "@apollo/client/react/components"
import { connect } from "react-redux";


class CurrencyBlock extends React.Component {
    render() {

        return (
            <div className="currency-block__container" onClick={this.props.currencySwitcher}>
                {/* execute query if no value is set up for current currency symbol or use the value from localstorage */}
                {(!localStorage.getItem("currentCurrency") && <Query query={GET_CURRENCIES}>
                    {({ data, loading, error }) => {
                        if (loading) return <p>loading</p>
                        if (error) return <p>error</p>;
                        if (data) {
                            //set the initial value for preffered currency in local storage in set(dictionary) format
                            localStorage.setItem("currentCurrency", data.currencies[0].symbol)
                        }
                        return (
                            <p className="currency-block__symbol">{this.props.currentCurrency}</p>
                        )

                    }}
                </Query>) || <p className="currency-block__symbol">{this.props.symbol}</p>}
                <div className="currency-block__arrow-icon-container">
                    <img className="arrow-icon-container__arrow-icon" src={this.props.isOpen ? "./assets/close_currencies.svg" : "./assets/expand_currencies.svg"} alt="shop icon"></img>
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