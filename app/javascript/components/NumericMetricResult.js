import React from "react"
import PropTypes from "prop-types"
class NumericMetricResult extends React.Component {
  constructor(props) {
    super(props);

    // TODO: register metric in its category hooks
    // TODO: add metric to a named hook for specific refs
    this.state = {
      value: this.updateValue()
    };
  }

  updateValue() {
    var text = $('#editor').text().trim();
    return window.metrics[this.props.code_ref](text);
  }

  update() {
    console.log('updating');
    this.setState({value: this.updateValue()})
  }

  render () {
    return (
      <div onClick={this.update.bind(this)}>
        <strong className="flow-text">
          {this.state.value.toLocaleString()}
        </strong>
        &nbsp;
        {this.props.text}
      </div>
    );
  }
}

NumericMetricResult.propTypes = {
  text: PropTypes.string,
  value: PropTypes.node,
  code_ref: PropTypes.string
};
export default NumericMetricResult
