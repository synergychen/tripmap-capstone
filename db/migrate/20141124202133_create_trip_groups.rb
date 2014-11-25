class CreateTripGroups < ActiveRecord::Migration
  def change
    create_table :trip_groups do |t|
      t.integer :user_id, null: false
      t.integer :trip_id, null: false

      t.timestamps null: false
    end

    add_index :trip_groups, [:user_id, :trip_id], unique: true
  end
end
