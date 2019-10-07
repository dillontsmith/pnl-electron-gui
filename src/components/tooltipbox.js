import React from "react";
import '../css/tooltipbox.css'
import { Resizable } from 're-resizable'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default class Tooltipbox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      class: props.className !== undefined ? `tooltipbox ${props.className}`:'tooltipbox'
    }
  }
  render(){
    return (
      <Resizable
        style={style}
        size={
          this.props.size
        }
        onResize={this.props.onResize}
        onResizeStart={this.props.onResizeStart}
        onResizeStop={this.props.onResizeStop}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false
        }}
        >
          <div className={this.props.className}>
              {this.props.text}
          </div>
      </Resizable>
    )
  };
}
