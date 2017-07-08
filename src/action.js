import { InputNo,DelItem } from './actionType';

const action = {
    InputNo: (data) => ({type:InputNo,data:data}),
    DelItem: (no) =>({type:DelItem,index:no})
}

module.exports = action;