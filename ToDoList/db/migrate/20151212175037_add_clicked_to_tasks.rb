class AddClickedToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :clicked, :boolean
  end
end
