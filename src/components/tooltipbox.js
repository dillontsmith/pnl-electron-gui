import React from "react";
import '../css/tooltipbox.css'

export default class Tooltipbox extends React.Component{
  constructor(props){
    super()
  }
  render(){
    return (
      <div className="tooltipbox">
        <div className="tooltipbody">
          {this.props.text}
        </div>
      </div>
    )
  };
}
