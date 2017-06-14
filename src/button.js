import React from 'react';

const CustomerButton = ({ data, delegateFun }) => 
    //arrow function 只有需要計算才需加大刮號，不加則是直接return
    <button onClick={() => delegateFun(data)}>{data}</button>


module.exports = CustomerButton;