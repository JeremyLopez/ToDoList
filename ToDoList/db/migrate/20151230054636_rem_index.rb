class RemIndex < ActiveRecord::Migration
  def change
		remove_index(:tasks, name: :position_index)
  end
end
