import React from "react";
import '../css/tooltipbox.css'

export default class Tooltipbox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      class: props.className !== undefined ? `tooltipbox ${props.className}`:'tooltipbox'
    }
  }
  render(){
    return (
      <div className={this.props.className}>
          {this.props.text}
      </div>
    )
  };
}
