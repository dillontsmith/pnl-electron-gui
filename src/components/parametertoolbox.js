import React from "react";
import '../css/tooltipbox.css'

export class ToolTipBox extends React.Component{
  constructor(props){
    super()
    this.state = {text:props.text}
  }
  updateText(newText) {
    this.setState({text:newText})
  }
  render(){
    return (
      <div className="tooltip-box">
        <div>
          {this.state.text}
        </div>
      </div>
    )
  };
}

export default ToolTipBox
