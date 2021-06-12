class WriteController < ApplicationController
  http_basic_authenticate_with name: "write", password: "write"

  def index
  end
end
