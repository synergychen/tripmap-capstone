class AddForeignkeyToTrip < ActiveRecord::Migration
  def change
    change_column :trips, :completed, :boolean, default: false, null: false
    add_column :trips, :user_id, :integer, null: false
    add_index :trips, :user_id
  end
end
