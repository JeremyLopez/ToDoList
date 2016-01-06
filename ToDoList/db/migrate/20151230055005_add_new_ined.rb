class AddNewIned < ActiveRecord::Migration
  def change
		add_index(:tasks, :position, options={ name: 'position_index', unique: true, order: { :position => :desc} })
  end
end
