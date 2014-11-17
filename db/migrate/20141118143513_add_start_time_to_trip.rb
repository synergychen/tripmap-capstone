class AddStartTimeToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :starts_on, :datetime, null: false
  end
end
