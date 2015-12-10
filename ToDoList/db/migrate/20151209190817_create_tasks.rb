class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :importance
      t.integer :completion
      t.integer :upvotes

      t.timestamps null: false
    end
  end
end
