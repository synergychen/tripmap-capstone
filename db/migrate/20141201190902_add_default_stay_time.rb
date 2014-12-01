class AddDefaultStayTime < ActiveRecord::Migration
  def change
    change_column :stops, :stay_time, :integer, default: 0, null: false
  end
end
