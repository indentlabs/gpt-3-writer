import React from "react"
import PropTypes from "prop-types"

import { EventEmitter } from "../event_emitter";

class NumericMetricResult extends React.Component {
  constructor(props) {
    super(props);

    // TODO: register metric in its category hooks
    // TODO: add metric to a named hook for specific refs
    this.state = {
      value:   undefined,
      loading: false
    };

    EventEmitter.subscribe('updateMetric', (data) => this.handleDispatch(data));
  }

  computeValue() {
    var text = $('#editor').text().trim();
    return this.props.computer(text);
  }

  handleDispatch(data) {
    // todo some kind of filtering so we're not updating everything all the time
    this.update();
  }

  update() {
    this.setState({updating: true});

    console.log('updating');
    this.setState({
      value:    this.computeValue(),
      updating: false
    });
  }

  showLoadState() {
    if (this.state.updating === true) {
      return(
        <div className="preloader-wrapper left small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <i className="material-icons green-text right">check</i>
      );
    }
  }

  showValue() {
    if (this.state.value !== undefined) {
      return this.state.value.toLocaleString();
    }
  }

  render () {
    return (
      <div className="metric-display" onClick={this.update.bind(this)} data-code-ref={this.props.code_ref}>
        <strong className="flow-text value-display">
          {this.showLoadState()}
          {this.showValue()}
        </strong>
        &nbsp;
        {this.props.text}

      </div>
    );
  }
}

NumericMetricResult.propTypes = {
  text:     PropTypes.string,
  value:    PropTypes.node,
  computer: PropTypes.func
};
export default NumericMetricResult;
