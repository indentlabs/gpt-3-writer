import Metric from "./Metric.js"
import NumericMetricResult from "../components/NumericMetricResult"

class LetterCountMetric extends Metric {
  static result_type  = NumericMetricResult;
  static result_label = "letters";

  static compute(text) {
    return text.length;;
  }
}

export default LetterCountMetric;