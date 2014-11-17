class AddForeignkeyToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :user_id, :integer, null: false
    add_index :trips, :user_id
  end
end
