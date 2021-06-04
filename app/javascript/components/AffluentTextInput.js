import React from "react"
import PropTypes from "prop-types"

import Typography from '@material-ui/core/Typography';

class AffluentTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.placeholderText
    }
  }

  render () {
    return (
      <React.Fragment>
        <Typography
          paragraph
          contentEditable="true" 
          id={this.props.id} 
          className="card-panel"
        >
          {this.props.defaultText}
        </Typography>
        <div className="suggestions container-fluid">
          <div className="row">
            <div className="col l3">
              <div className="grey-text center uppertext">Suggestion #1</div>
              <div className="hoverable card suggestion-card">
                <div className="card-content suggestion" contentEditable="true">
                </div>
                <div className="card-action center teal use-suggestion">
                  <a href="#" className="white-text">Use this suggestion</a>
                </div>
              </div>
            </div>
            <div className="col l4">
              <div className="grey-text center uppertext">Suggestion #2</div>
              <div className="hoverable card suggestion-card">
                <div className="card-content suggestion" contentEditable="true">
                </div>
                <div className="card-action center teal use-suggestion">
                  <a href="#" className="white-text">Use this suggestion</a>
                </div>
              </div>
            </div>
            <div className="col l3">
              <div className="grey-text center uppertext">Suggestion #3</div>
              <div className="hoverable card suggestion-card">
                <div className="card-content suggestion" contentEditable="true">
                </div>
                <div className="card-action center teal use-suggestion">
                  <a href="#" className="white-text">Use this suggestion</a>
                </div>
              </div>
            </div>
            <div className="col l2">
              <div className="grey-text center uppertext">Options</div>
              <div className="center">
                <a href="#" className="btn regenerate-suggestions">
                  More suggestions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="helper-text grey-text">...and when you aren't sure how to continue, press this button!</div>
          <div id="continue-writing" className="btn btn-large">GPT-3, take the wheel</div>
        
          <div className="progress" id="progress-bar">
            <div className="indeterminate"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AffluentTextInput.propTypes = {
  placeholderText: PropTypes.string,
  id: PropTypes.string
};
export default AffluentTextInput
