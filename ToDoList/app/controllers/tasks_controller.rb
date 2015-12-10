class TasksController < ApplicationController
	def index
    respond_with Task.all
  end

  def create
    respond_with Task.create(task_params)
  end
	
	def destroy
		task = Task.find(params[:id])
		task.destroy(task)
  end

  def show
    respond_with Task.find(params[:id])
  end

  def upvote
    task = Task.find(params[:id])
		task.increment!(:importance)

    respond_with task
  end
	
	def downvote
    task = Task.find(params[:id])
		task.decrement!(:importance)

    respond_with task
  end
	
	def up_completion
		task = Task.find(params[:id])
		task.increment!(:completion)
		
		respond_with task
	end
	
	def down_completion
		task = Task.find(params[:id])
		task.decrement!(:completion)
		
		respond_with task
	end

  private
  def task_params
		params.require(:task).permit(:title, :completion, :importance)
  end
	
end
