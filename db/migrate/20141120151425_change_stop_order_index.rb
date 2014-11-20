class ChangeStopOrderIndex < ActiveRecord::Migration
  def up
    remove_index :stops, :order
    add_index :stops, :order
  end

  def down
    remove_index :stops, :order
    add_index :stops, :order, unique: true
  end
end
