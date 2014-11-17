class AddForeignkeyToTrip < ActiveRecord::Migration
  def change
    change_column :trips, :completed, :boolean, default: false, null: false
    change_column :trips, :created_at, :datetime, null: false
    change_column :trips, :updated_at, :datetime, null: false
    add_column :trips, :user_id, :integer, null: false
    add_index :trips, :user_id
  end
end
