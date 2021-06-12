import Metric from "./Metric.js"
import NumericMetricResult from "../components/NumericMetricResult"

class SentenceCountMetric extends Metric {
  static result_type  = NumericMetricResult;
  static result_label = "sentences";

  static compute(text) {
    return text.split(/\.\?!/).length;;
  }
}

export default SentenceCountMetric;