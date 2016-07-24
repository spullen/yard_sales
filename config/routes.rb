Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  resources :listings, only: [:index, :create]
end
