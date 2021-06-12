class WriteController < ApplicationController
  http_basic_authenticate_with name: "write", password: ENV.fetch('auth_password', '')

  def index
  end
end
