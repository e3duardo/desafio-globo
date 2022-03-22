require 'sidekiq/web'

Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: "_interslice_session"

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  resources :votes, only: [:index, :create]
  resources :surveys
  resources :brothers
  resources :users

  get '/public-survey', to: 'public_survey#index'
  post '/auth/login', to: 'authentication#login'
end
