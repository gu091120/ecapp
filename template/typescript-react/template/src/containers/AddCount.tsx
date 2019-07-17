import * as React from 'react';
import { connect } from "react-redux";
import Home from "../components/Home";
import {add_count} from "./../action/index";

const addCountContainer = ({num,dispatch}) => {
  return (
    <div>
     <p>count:{num}</p>
     <input type="button" value="addCount" onClick={()=>{
       dispatch(add_count(2))
     }}/>
     <Home/>
    </div>
  );
};

const countProps = ({addCount})=>({
  num:addCount.num,
})


export default connect(countProps)(addCountContainer);
