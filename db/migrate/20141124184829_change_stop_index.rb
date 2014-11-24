class ChangeStopIndex < ActiveRecord::Migration
  def up
    remove_index :stops, [:trip_id, :location_id]
    add_index :stops, [:trip_id, :location_id]
  end

  def down
    remove_index :stops, [:trip_id, :location_id]
    add_index :stops, [:trip_id, :location_id], unique: true
  end
end
