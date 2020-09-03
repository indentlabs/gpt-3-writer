import Metric from "./Metric.js"
import NumericMetricResult from "../components/NumericMetricResult"

class PageCountMetric extends Metric {
  static result_type  = NumericMetricResult;
  static result_label = "pages";

  static compute(text) {
    return 42;
  }
}

export default PageCountMetric;