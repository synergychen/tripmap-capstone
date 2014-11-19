class Stop < ActiveRecord::Base
  belongs_to :trip
  belongs_to :location

  def self.in_order
    order(:order)
  end

  def update_all_stop_orders
    trip.stops.each do |stop|
      if stop.order > order
        stop.update(order: stop.order-1)
      end
    end
  end
end
