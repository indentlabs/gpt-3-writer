require 'test_helper'

class WriteControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get write_index_url
    assert_response :success
  end

end
