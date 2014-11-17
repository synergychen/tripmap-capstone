class CreateTripLocationRelationships < ActiveRecord::Migration
  def change
    create_table :trip_location_relationships do |t|
      t.integer :trip_id, null: false
      t.integer :location_id, null: false
      t.integer :order, null: false
      t.integer :stay_time, null: false
      t.string :transportation_mode

      t.timestamps null: false
    end

    add_index :trip_location_relationships, [:trip_id, :location_id], unique:
      true
    add_index :trip_location_relationships, :location_order, unique: true
  end
end
