class Trip < ActiveRecord::Base
  validates :starts_on, presence: true
  validates :city, presence: true

  belongs_to :user

  has_many :stops
  has_many :locations, through: :stops

  def reorder_stops_after(stop, proposed_order)
    ordered_stop_ids = get_ordered_stops_ids

    new_stop_ids = ordered_stop_ids.insert(proposed_order - 1,
                                           ordered_stop_ids.delete(stop.id))

    new_stop_ids.each_with_index do |id, index|
      stops.find(id).update(order: index + 1)
    end
  end

  def update_stops_after(deleted_stop)
    stops.each do |stop|
      if stop.order > deleted_stop.order
        stop.update(order: stop.order - 1)
      end
    end
  end

  private

  def get_ordered_stops_ids
    stop_ids = stops.pluck(:id)
    stop_orders = stops.pluck(:order)
    hash = {}

    stop_ids.count.times do |i|
      hash[stop_orders[i]] = stop_ids[i]
    end

    hash.sort.to_h.values
  end
end
