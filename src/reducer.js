import { InputNo, DelItem } from './actionType';

const initState = {
    items: [],
    operate: '+',
    showText: '',
}

const Reducer = (state = initState, action) => {

    if (action.type === InputNo) {
        let result = 0;
        let inputNum = action.data;
        switch (inputNum) {
            case "+":
                return {
                    ...state,
                    operate: '+',
                    showText: ''
                }
            case "-":
                return {
                    ...state,
                    operate: '-',
                    showText: ''
                }
            case "c":
                return {
                    ...state,
                    operate: '+',
                    showText: '',
                    items: []
                }
            case "=":
                return {
                    ...state,
                    showText: calculate(state.items)
                }
            default:
                let data = action.data;
                var calcContext = {
                    num: data,
                    operate: state.operate,
                }
                let newItems = state.items.concat(calcContext);
                return {
                    ...state,
                    items: newItems,
                    showText: data
                }
        }
    }
    else if (action.type === DelItem) {
        let items = Object.assign([], state.items);
        items.splice(action.index, 1);

        return {
            ...state,
            items: items,
            showText: calculate(items)
        }
    }

    return state;
}

function calculate(items) {
    let result = 0;
    items.map((obj) => {

        let opearte = obj.operate;
        let num = parseInt(obj.num);
        if (opearte === "+") {
            result += num;
        } else {
            result -= num;
        }

    })
    return result;

}

module.exports = Reducer;