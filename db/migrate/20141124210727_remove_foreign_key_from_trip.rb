class RemoveForeignKeyFromTrip < ActiveRecord::Migration
  def up
    remove_index :trips, :user_id
    remove_column :trips, :user_id
  end

  def down
    add_column :trips, :user_id, :integer, null: false
    add_index :trips, :user_id
  end
end
