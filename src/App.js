import React, { Component } from 'react';
import CustomerButton from './button';
import buttons from './calculatorConfig';
import { connect } from 'react-redux';
import action from './action';

const App = ({
    state: {
        items,
        operate,
        showText,
    },
    InputNo,
    DelItem
}) => {

    //動態產生button
    let btnList = [];
    for (let i = 1; i <= buttons.length; i++) {
        btnList.push(<CustomerButton key={i} data={buttons[i - 1]} delegateFun={() => InputNo(buttons[i - 1])} />)
        if (i % 3 === 0) {
            btnList.push(<br key={'br_' + i} />)
        }
    }
    const calcList = items.map((obj, index) => {
        return <option value={obj.num} key={index} onClick={() => DelItem(index)}>value:{obj.num}, operate:{obj.operate}</option>
    });

    return (
        <div>
            <input type="text" value={showText} /><br />
            {btnList}
            <hr />
            <select name="calcContext" multiple="multiple" style={{ width: 200, height: 300 }}   >
                {calcList}
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log(state);
    return { state: state };
}
const mapDispatchToProps = (dispatch) => ({
    InputNo: (data) => dispatch(action.InputNo(data)),
    DelItem: (index) => dispatch(action.DelItem(index))
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);