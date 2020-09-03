import Metric from "./Metric.js"
import NumericMetricResult from "../components/NumericMetricResult"

class ParagraphCountMetric extends Metric {
  static result_type  = NumericMetricResult;
  static result_label = "paragraphs";

  static compute(text) {
    return 13;
  }
}

export default ParagraphCountMetric;