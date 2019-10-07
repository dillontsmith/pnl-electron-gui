import React from 'react'
import '../css/parametercontrolbox.css'
import { Resizable } from 're-resizable'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export class ParameterControlBox extends React.Component {
  constructor(props) {
    super()
    this.state = {
      text: props.text,
      class: props.className !== undefined ? `parametercontrolbox ${props.className}`:'parametercontrolbox'
    }
  }

  updateText(newText) {
    this.setState({ text: newText })
  }

  render() {
    return (
      <Resizable
        style={style}
        onResize={this.props.onResize}
        onResizeStart={this.props.onResizeStart}
        onResizeStop={this.props.onResizeStop}
        enable={{
          top:false,
          right:false,
          bottom:true,
          left:true,
          topRight:false,
          bottomRight:false,
          bottomLeft:true,
          topLeft:false
        }}
        className='sidebar'
        defaultSize={
          this.props.defaultSize
        }
        size={
          this.props.size
        }
      >
        <div className={this.state.class}>
            {this.state.text}
        </div>
      </Resizable>
    )
  };
}

export default ParameterControlBox
