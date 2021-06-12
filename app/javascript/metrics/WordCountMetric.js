import Metric from "./Metric.js"
import NumericMetricResult from "../components/NumericMetricResult"

class WordCountMetric extends Metric {
  static result_type  = NumericMetricResult;
  static result_label = "words";

  static compute(text) {
    return text.split(' ').length;
  }
}

export default WordCountMetric;