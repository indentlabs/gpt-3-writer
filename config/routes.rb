Rails.application.routes.draw do
  post 'api/autocomplete'
  root to: 'write#index'
end
