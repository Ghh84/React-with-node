import React, { useState } from 'react';
import { currencies } from './commonCurrency';   
const CurrencySelect = ({ variant,onChange, required}) => {
    // const [currency, setCurrency] = useState(''); 
    // function selectCurrency1(e){
    //     const name = e.target.name;
    //     const val = e.target.value;
    //     setCurrency(e.target.value)
    //     //setCurrency(prevState => ({ ...prevState, [name]:val }));
    // };
    return (
        <div className="form-group">
            <select
                style={{width: '185px'}}
                onChange={onChange}
                className="form-control selectpicker"
            >
                <option disabled="disabled" selected="selected" required>
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