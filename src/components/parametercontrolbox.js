import React from 'react'
import '../css/parametercontrolbox.css'

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
      <div className={this.state.class}>
          {this.state.text}
      </div>
    )
  };
}

export default ParameterControlBox
