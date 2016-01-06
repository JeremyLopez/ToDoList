class RemoveIndex < ActiveRecord::Migration
  def change
		remove_index(:tasks, name: :position_index)
  end
end
