class CommentsController < ApplicationController
	
	def create
		task = Task.find(params[:task_id])
		comment = task.comments.create(comment_params)
		respond_with task, comment
	end
	
	def upvote
		task = Task.find(params[:task_id])
		comment = task.comments.find(params[:id])
		comment.increment!(:upvotes)
		
		respond_with task, comment
	end
	
	private
	def comment_params
		params.require(:comment).permit(:body)
	end
	
end
