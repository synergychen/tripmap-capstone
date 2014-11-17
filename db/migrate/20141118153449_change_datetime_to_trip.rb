class ChangeDatetimeToTrip < ActiveRecord::Migration
  def change
    remove_column :trips, :date
    add_column :trips, :starts_on, :datetime, null: false
  end
end
