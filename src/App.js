import React, { Component } from 'react';
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
    delete items[e];
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
    let inputNum = e.target.value;

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

    return (
      <div>
        <input type="text" value={this.state.showText} /><br />
        <button value="7" onClick={this.onClick}>7</button>
        <button value="8" onClick={this.onClick}>8</button>
        <button value="9" onClick={this.onClick}>9</button><br />
        <button value="4" onClick={this.onClick}>4</button>
        <button value="5" onClick={this.onClick}>5</button>
        <button value="6" onClick={this.onClick}>6</button><br />
        <button value="1" onClick={this.onClick}>1</button>
        <button value="2" onClick={this.onClick}>2</button>
        <button value="3" onClick={this.onClick}>3</button><br />
        <button value="+" onClick={this.onClick}>+</button>
        <button value="-" onClick={this.onClick}>-</button>
        <button value="=" onClick={this.onClick}>=</button>
        <button value="c" onClick={this.onClick}>c</button><br />
        <hr />
        
        <select name="calcContext" multiple="multiple" style={{ width: 200, height: 300 }}   >
          {calcList}
        </select>
      </div>
    )
  }
}

module.exports = App;