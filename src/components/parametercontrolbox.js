import React from "react";
import '../css/parametercontrolbox.css'

export class ParameterControlBox extends React.Component{
  constructor(props){
    super()
    this.state = {text:props.text}
  }
  updateText(newText) {
    this.setState({text:newText})
  }
  render(){
    return (
      <div className="parametercontrolbox">
        <div className="parametercontrolbody">
          {this.state.text}
        </div>
      </div>
    )
  };
}

export default ParameterControlBox
