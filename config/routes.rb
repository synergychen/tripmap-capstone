Rails.application.routes.draw do
  root "trips#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  resources :trips do
    resources :stops, only: [:new, :create, :edit, :update, :destroy]
    resources :trip_groups, only: [:index]
  end

  resources :stops, only: [:new, :create, :edit, :update, :destroy] do
    resource :stop_orders, only: [:edit, :update]
  end

  resources :locations, only: [:new, :create]
end
