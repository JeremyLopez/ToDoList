class AddIndex < ActiveRecord::Migration
  def change
		add_index(:tasks, :position, options={ name: 'position_index', unique: true })
  end
end
