import React, { Component } from 'react';
import CustomerButton from './button';
import buttons from './calculatorConfig';

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
    //let items = this.state.items 這件事情會有 instance 的問題，建議先 clone 一份出來再做處理，處理完畢再塞回 state！
    let items = Object.assign([],this.state.items);
    items.splice(e,1);

    this.setState({ items: items });
    let result = this.calcNum();
    this.setState({ showText: result });
  }

  //計算邏輯，將陣列內容取出並做計算
  calcNum = () => {
    let result = 0;

    //Map 用ES6方式改寫
    this.state.items.map((obj)=>{
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
    switch(inputNum){
      case "+":
        this.setState({ operate: "+" });
        break;
      case "-":
        this.setState({ operate: "-" });
        break;
      case "c":
        this.setState({ showText: '', items: [], operate: "+" });
        break;
      case "=":
        //計算結果
        result = this.calcNum();
        this.setState({ showText: result });
        break;
      default :
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
    let btnList = [];
    for (let i = 1; i <= buttons.length; i++) {
      btnList.push(<CustomerButton key={i} data={buttons[i - 1]} delegateFun={this.onClick} />)
      if (i % 3 === 0) {
        btnList.push(<br key={'br_' + i} />)
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