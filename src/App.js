import React, { Component } from 'react';
import CustomerButton from './button';

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      items: [],
      operate: '+',
      showText: '',
    };
  }

  //arrow function寫法，可用在auto bind 就可以不用在constructor寫bind直接使用就好
  //移除選取的計算內容
  onChange = (e) => {
    let items = this.state.items;
    items.splice(e,1);
    this.setState({ items: items });
    let result = this.calcNum();
    this.setState({ showText: result });
  }

  //計算邏輯，將陣列內容取出並做計算
  calcNum = () => {
    let result = 0;
    this.state.items.map(function (obj) {
      let opearte = obj.operate;
      let num = parseInt(obj.num);
      if (opearte === "+") {
        result += num;
      } else {
        result -= num;
      }
      return result;
    })
    return result;
  }


  onClick(e) {
    let result = 0;
    let inputNum = e;

    if (inputNum === "+") {
      this.setState({ operate: "+" });
    } else if (inputNum === "-") {
      this.setState({ operate: "-" });
    } else if (inputNum === "c") {
      this.setState({ showText: '', items: [], operate: "+" });
    } else if (inputNum === "=") {
      //計算結果
      result = this.calcNum();
      this.setState({ showText: result });
    } else {
      var calcContext = {
        num: inputNum,
        operate: this.state.operate,
      }
      var items = this.state.items.concat(calcContext);
      this.setState({ items: items, showText: inputNum });
    }
  }

  //列出計算內容
  render() {
    const calcList = this.state.items.map((obj, index) => {
      return <option value={obj.num} key={index} onClick={() => this.onChange(index)}>value:{obj.num}, operate:{obj.operate}</option>
    })

     //劃出計算機按鈕
    let numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, '+', '-', '=', 'c'];
    let btnList = [];
    for (let i = 1; i <= numbers.length; i++) {
      btnList.push(<CustomerButton data={numbers[i - 1]} delegateFun={this.onClick} />)
      if (i % 3 === 0) {
        btnList.push(<br />)
      }
    }

    return (
      <div>
        <input type="text" value={this.state.showText} /><br />
        {btnList}
        <hr />

        <select name="calcContext" multiple="multiple" style={{ width: 200, height: 300 }}   >
          {calcList}
        </select>
      </div>
    )
  }
}

module.exports = App;