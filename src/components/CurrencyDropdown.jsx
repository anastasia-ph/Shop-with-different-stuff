import React from "react";
import { GET_CURRENCIES } from "../GRAPHQL/Queries";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";

class CurrencyDropdown extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="currency-dropdown__container" >
                    <Query query={GET_CURRENCIES}>
                        {({ data, error, loading }) => {
                            if (error) return <p>Error!</p>
                            if (loading) return <p>Loading...</p>

                            return (
                                <>

                                    {data.currencies.map((e, i) => <div className={this.props.currency === e.symbol ? `currency-dropdown__item currency-dropdown__item_selected` : `currency-dropdown__item item${i}`} id={`currency-container${i}`} onClick={this.props.switchCurrency}><p className="currency-dropdown__text">{e.symbol}</p><p className="currency-dropdown__text">{e.label}</p></div>)}
                                </>
                            )
                        }
                        }
                    </Query>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        currency: state.currencyReducer.currentCurrency

    }
}
export default connect(mapStateToProps, undefined)(CurrencyDropdown)