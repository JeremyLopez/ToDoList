Rails.application.routes.draw do
	
	root to: 'application#angular'
	
	resources :tasks, only: [:create, :index, :show, :destroy] do
		resources :comments, only: [:show, :create] do
			member do
				put '/upvote' => 'comments#upvote'
			end
		end
		
		member do
			put '/upvote' => 'tasks#upvote'
			put '/downvote' => 'tasks#downvote'
			put '/up_completion' => 'tasks#up_completion'
			put '/down_completion' => 'tasks#down_completion'
		end
	end
end
