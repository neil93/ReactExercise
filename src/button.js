import React, { Component } from 'react';

const CustomerButton = ({ data, delegateFun }) => {
    return (
            <button onClick={() => delegateFun(data)}>{data}</button>
    )
}

module.exports = CustomerButton;