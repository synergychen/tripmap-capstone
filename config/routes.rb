Rails.application.routes.draw do
  root "trips#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  resources :trips, only: [:index, :new, :create]
end
