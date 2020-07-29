require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get autocomplete" do
    get api_autocomplete_url
    assert_response :success
  end

end
