Rails.application.routes.draw do
  resources :votes, only: [:index, :create]
  resources :surveys
  resources :brothers
  resources :users

  post '/auth/login', to: 'authentication#login'
end
