class Stop < ActiveRecord::Base
  belongs_to :trip
  belongs_to :location

  def self.in_order
    order(:order)
  end
end
