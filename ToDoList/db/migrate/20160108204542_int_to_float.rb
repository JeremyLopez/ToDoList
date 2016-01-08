class IntToFloat < ActiveRecord::Migration
  def change
		change_column :tasks, :steps, :float
  end
end
