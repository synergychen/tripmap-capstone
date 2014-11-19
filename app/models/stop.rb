class Stop < ActiveRecord::Base
  belongs_to :trip
  belongs_to :location

  def self.in_order
    order(:order)
  end

  def update_stops_after(deleted_stop)
    stops.each do |stop|
      if stop.order > deleted_stop.order
        stop.update(order: stop.order - 1)
      end
    end
  end
end
