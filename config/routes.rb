Rails.application.routes.draw do
  root "publics#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  resources :publics, only: [:index]
  resources :trips do
    resources :stops, only: [:new, :create, :edit, :update, :destroy]
    resource :trip_groups, only: [:show, :create, :destroy]
    resource :archives, only: [:create, :destroy]
  end

  resources :stops, only: [:new, :create, :edit, :update, :destroy] do
    resource :stop_orders, only: [:edit, :update]
  end

  resources :locations, only: [:new, :create]
end
