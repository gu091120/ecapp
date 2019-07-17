import { combineReducers } from "redux";


interface ACTION {
  type:string
  num:number
}

const addCount = (state = { num: 0 }, action:ACTION) => {
  switch (action.type) {
    case "ADD_COUNT":
      return {
        num: state.num + (action.num || 1)
      };

    default:
      return state
  }
};

export default combineReducers({
  addCount
});
