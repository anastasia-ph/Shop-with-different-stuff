import React from "react";
import { GET_CURRENCIES } from "../GRAPHQL/Queries";
import { Query } from "@apollo/client/react/components";
export class CurrencyDropdown extends React.Component {
    render() {

        return (
            <React.Fragment>
                <Query query={GET_CURRENCIES}>
                    {({ data, error, loading }) => {
                        if (error) return <p>Error!</p>
                        if (loading) return <p>Loading...</p>
                        return (
                            <div className="currency-dropdown__container" >
                                {data.currencies.map((e, i) => <div className={`currency-dropdown__item item${i}`} id={`currency-container${i}`} onClick={this.props.switchCurrency}><p className="currency-dropdown__text">{e.symbol}</p><p className="currency-dropdown__text">{e.label}</p></div>)}
                            </div>
                        )
                    }
                    }
                </Query>
            </React.Fragment>
        )
    }
}