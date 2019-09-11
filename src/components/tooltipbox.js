import React from "react";
import '../css/tooltipbox.css'
import { Classes } from '@blueprintjs/core'

export default class Tooltipbox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      class: props.className != undefined ? `tooltipbox ${props.className}`:'tooltipbox'
    }
  }
  render(){
    return (
      <div className={this.state.class}>
          {this.props.text}
      </div>
    )
  };
}
