class RenameTripLocationRelationship < ActiveRecord::Migration
  def change
    remove_index :trip_location_relationships, [:trip_id, :location_id]
    remove_index :trip_location_relationships, :order

    drop_table :trip_location_relationships

    create_table :stops do |t|
      t.integer :trip_id, null: false
      t.integer :location_id, null: false
      t.integer :order, null: false
      t.integer :stay_time, null: false
      t.string :transportation_mode

      t.timestamps null: false
    end

    add_index :stops, [:trip_id, :location_id], unique: true
    add_index :stops, :order, unique: true
  end
end
