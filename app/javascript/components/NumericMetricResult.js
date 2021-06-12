import React from "react"
import PropTypes from "prop-types"

import { EventEmitter } from "../lib/event_emitter";

class NumericMetricResult extends React.Component {
  constructor(props) {
    super(props);

    // TODO: register metric in its category hooks
    this.state = {
      value:      undefined, // result displayed to the user
      loading:    false,     // whether or not the result is currently being computed
      up_to_date: false      // whether or not the text has changed since we last computed
    };

    EventEmitter.subscribe('updateMetric', (data) => this.handleDispatch(data));
    EventEmitter.subscribe('textChanged',  (data) => this.markResultOutOfDate(data));
  }

  markResultOutOfDate() {
    if (this.state.up_to_date) {
      this.setState({ up_to_date: false });
    }
  }

  computeValue() {
    var text = $('#editor').text().trim();
    return this.props.computer(text);
  }

  handleDispatch(update_trigger) {
    // We're listening for all updateMetric events, but we only want to update when it's intended for this result's specific metric
    if (update_trigger.metric == this.props.metric && !this.state.up_to_date) {
      this.update();
    }
  }

  update() {
    this.setState({updating: true});

    console.log('updating');
    this.setState({
      value:      this.computeValue(),
      updating:   false,
      up_to_date: true
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
  metric:   PropTypes.string,
  text:     PropTypes.string,
  value:    PropTypes.node,
  computer: PropTypes.func
};
export default NumericMetricResult;
