
import React from 'react';
import HeaderBlock from './components/HeaderBlock';
import PDP from './components/ProductDescriptionPage';

export class ProductDescriptionPage extends React.Component {
    state = {
        currentCategory: localStorage.getItem("currentCategory"),
        isCurrencyBlockDisplayed: false,
    }

    render() {

        return (
            <div className='wrapper'>
                <HeaderBlock ></HeaderBlock>
                <PDP></PDP>
            </div>)
    }
}