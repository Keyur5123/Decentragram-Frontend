import React from "react";
import "../chat.css";
export default function Search(props) {
  const users = props?.users;
function handlerChange(e) {
  e.preventDefault();
 
  console.log('[search.js]users',users);
  let search = e.target.value;
  let condition = new RegExp(search);
  
  let result = users?.filter(function (el) {
    return condition.test(el.userName);
  });
  props.searchUser(result)
  // console.log('[search.js]result',result);
 
}
  return (
    <div className="chat-search-box">
      <div className="input-group">
        <input className="form-control" placeholder="Search" onChange={(e)=>handlerChange(e)} />
        {/* <div className="input-group-btn">
          <button type="button" className="btn btn-info">
            <i className="fa fa-search"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
}
