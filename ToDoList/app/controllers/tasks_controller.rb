class TasksController < ApplicationController
	def index
    respond_with Task.all
  end

  def create
    respond_with Task.create(task_params)
  end
	
	def destroy
		task = Task.find(params[:id])
		task.destroy
		
		respond_with task
  end

  def show
    respond_with Task.find(params[:id])
  end

  def upvote
    task = Task.find(params[:id])
		task.increment!(:importance)

    respond_with task
  end
	
	def completeMe
		task = Task.find(params[:id])
#		WHAT GOES HERE
		task.clicked = true
#		task.completion = task.steps
		task.save
		
		respond_with task
	end
	
	def uncompleteMe
		task = Task.find(params[:id])
#		WHAT GOES HERE
		task.clicked = false
#		task.completion = 0
		task.save
		
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
		params.require(:task).permit(:title, :completion, :importance, :steps, :clicked)
  end
	
end
