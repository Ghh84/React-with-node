import React, { useState } from 'react';
import { currencies } from './commonCurrency';   
const CurrencySelect = ({ variant }) => {
    const [currency, setCurrency] = useState({
        firstCurrency: "Rs",
        secondCurrency: "Rs"
    });
    function selectCurrency(e){
        const name = e.target.name;
        const val = e.target.value;
        setCurrency(prevState => ({ ...prevState, [name]:val }));
    };
    return (
        <div className="form-group">
            <select
                style={{width: '185px'}}
                onChange={selectCurrency}
                className="form-control selectpicker"
            >
                <option disabled="disabled" selected="selected">
                    Select currency
                </option>
                {Object.keys(currencies).map(item => {
                    return(
                        <option value={currencies[item].symbol}>{currencies[item].name}</option>
                    )
                })}
            </select>
            </div>  
    );
};
export default CurrencySelect;