Rails.application.routes.draw do
  root "trips#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  resources :trips do
    resources :stops, only: [:new, :create]
  end

  resources :locations, only: [:new, :create]
end
