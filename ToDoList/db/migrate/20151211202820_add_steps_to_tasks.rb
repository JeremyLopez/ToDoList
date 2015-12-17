class AddStepsToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :steps, :integer
  end
end
