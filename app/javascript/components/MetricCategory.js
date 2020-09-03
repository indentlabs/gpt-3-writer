import React from "react"
import PropTypes from "prop-types"
import NumericMetricResult from "./NumericMetricResult"

import { EventEmitter } from "../event_emitter";

import WordCountMetric from "../metrics/WordCountMetric"
import PageCountMetric from "../metrics/PageCountMetric";
import LetterCountMetric from "../metrics/LetterCountMetric";
import SentenceCountMetric from "../metrics/SentenceCountMetric";
import ParagraphCountMetric from "../metrics/ParagraphCountMetric";

class MetricCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.category,

      // Convert passed-in metric names into the proper Metric objects
      metrics: this.props.metrics.map(this.metricLookupTable.bind(this))
    };

    this.state['metric_results'] = this.state.metrics.map((metric, i) => {
      return <NumericMetricResult metric={metric.name} text={metric.result_label} computer={metric.compute} />
    });
  }

  metricLookupTable(metric_name) {
    switch (metric_name) {
      case 'WordCountMetric':      return WordCountMetric;
      case 'PageCountMetric':      return PageCountMetric;
      case 'ParagraphCountMetric': return ParagraphCountMetric;
      case 'SentenceCountMetric':  return SentenceCountMetric;
      case 'LetterCountMetric':    return LetterCountMetric;
    }
  }

  componentDidMount() {
    console.log('mounted');

    $('.collapsible').collapsible({
      onOpenStart: this.updateSection.bind(this)
    });
  }

  updateSection() {
    console.log('updating section');

    this.state.metrics.forEach((metric) => EventEmitter.dispatch('updateMetric', { metric: metric.name }));

    // this.state.metrics.forEach((metric) => EventEmitter.dispatch('updateMetric' + , { metric: metric.name }));
    // EventEmitter.dispatch('updateMetric', { category: this.state.category });
  }

  render () {
    return (
      <ul className="collapsible collapsible-accordion" data-category="length">
        <li>
          <a className="collapsible-header">
            {this.props.category}
            <i className="material-icons">account_tree</i>
          </a>
          <div className="collapsible-body">
            <div className="row">
              <div className="col s12">
                <ul>
                  {this.state.metric_results.map((result, i) => {
                    return(
                      <li key={i}>
                        {result}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

MetricCategory.propTypes = {
  category: PropTypes.string,
  metrics:  PropTypes.array
  // value: PropTypes.node,
  // code_ref: PropTypes.string
};
export default MetricCategory;
