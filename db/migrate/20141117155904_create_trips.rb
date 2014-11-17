class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.date :date
      t.string :city
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
