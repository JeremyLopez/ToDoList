class TasksController < ApplicationController
	
	def index
		respond_with Task.all.order(:position)
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

	def moveOrder 
		# I know this is wrong.  mainCtrl.js function cannot even find this function?  
		# How do I access the task while dragging
		
		config.logger = Logger.new(STDOUT)
		
		movedTask = Task.find(params[:id])
		logger.debug "movedTask: #{movedTask.id} #{movedTask.title}"
		end_pos = params[:end_pos]
		logger.debug "End Position: #{end_pos}"
		
		
		movedTask.position = end_pos
		movedTask.save!
		
		effectedTasks = []
		
		Task.find_each do |task|
			if task.position >= end_pos && task.id != movedTask.id
#				logger.debug "task: #{task.id} #{task.title}"
				effectedTasks.push(task)
			end
		end
#		
		logger.debug "Effected Tasks: #{effectedTasks}"
#		
		effectedTasks.each do |task|
			task.increment!(:position)
		end
		
		

		respond_with movedTask
	end

	def completeMe
		task = Task.find(params[:id])
		task.clicked = true
		task.completion = task.steps
		task.save

		respond_with task
	end

	def uncompleteMe
		task = Task.find(params[:id])
		task.clicked = false
		task.completion = 0
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
		params.require(:task).permit(:title, :completion, :importance, :steps, :clicked, :position)
	end
	
end
