Rails.application.routes.draw do
  resources :votes, only: [:index, :create]
  resources :surveys
  resources :brothers
  resources :users

  get '/public-survey', to: 'public_survey#index'
  post '/auth/login', to: 'authentication#login'
end
