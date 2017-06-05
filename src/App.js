import React,{Component} from 'react';
class App extends Component{
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state  ={
      showText:'',
    };
  }

  onClick(e){ 
    let result = 0;
    let inputNum = e.target.value;

    this.setState({showText:this.state.showText + inputNum });

    if(inputNum=="c"){
      this.setState({result:0,showText:''});
    } else if (inputNum=="="){
        let calcText = this.state.showText;
        if(calcText.indexOf('+')>-1)
        {
          let splitStr = calcText.split('+');
          result = parseInt( splitStr[0]) + parseInt( splitStr[1]);
        }

        if(calcText.indexOf('-')>-1)
        {
          let splitStr = calcText.split('-');
          result = parseInt( splitStr[0]) - parseInt( splitStr[1]);
        }
      this.setState({result:0,showText:result});
    }

  }

  
  render(){
    return (
      <div>
        <input type="text" value={this.state.showText}/><br/>
        <button value="7" onClick={this.onClick}>7</button>
        <button value="8" onClick={this.onClick}>8</button>
        <button value="9" onClick={this.onClick}>9</button><br/>
        <button value="4" onClick={this.onClick}>4</button>
        <button value="5" onClick={this.onClick}>5</button>
        <button value="6" onClick={this.onClick}>6</button><br/>
        <button value="1" onClick={this.onClick}>1</button>
        <button value="2" onClick={this.onClick}>2</button>
        <button value="3" onClick={this.onClick}>3</button><br/>
        <button value="+" onClick={this.onClick}>+</button>
        <button value="-" onClick={this.onClick}>-</button>
        <button value="=" onClick={this.onClick}>=</button>
        <button value="c" onClick={this.onClick}>c</button><br/>
      </div>
    )
  }
}

module.exports =App;