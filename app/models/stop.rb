class Stop < ActiveRecord::Base
  validates :order, presence: true
  validates :stay_time, presence: true
  validates :transportation_mode, presence: true

  belongs_to :trip
  belongs_to :location

  def self.in_order
    order(:order)
  end
end
