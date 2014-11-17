class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.date :date
      t.string :city
      t.boolean :completed, default: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :trips, :user_id
  end
end
