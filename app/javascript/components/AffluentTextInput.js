import React from "react"
import PropTypes from "prop-types"

class AffluentTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.placeholderText
    }
  }

  render () {
    return (
      <div contentEditable="true" 
           id={this.props.id} 
           className="card-panel"
      >
        <p>
          {this.props.defaultText}
        </p>
      </div>
    );
  }
}

AffluentTextInput.propTypes = {
  placeholderText: PropTypes.string,
  id: PropTypes.string
};
export default AffluentTextInput
