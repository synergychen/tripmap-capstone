class AddOwnerIdToTrip < ActiveRecord::Migration
  def up
    add_column :trips, :owner_id, :integer, null: false
    add_index :trips, :owner_id
  end

  def down
    remove_index :trips, :owner_id
    remove_column :trips, :owner_id
  end
end
