class Trip < ActiveRecord::Base
  validates :starts_on, presence: true
  validates :city, presence: true

  has_many :trip_groups
  has_many :users, through: :trip_groups

  has_many :stops
  has_many :locations, through: :stops

  belongs_to :owner, class_name: "User"

  default_scope { order(:starts_on) }

  def update_stop_order_after(stop, proposed_order)
    stop_ids_in_order = stops.sort_by(&:order).map(&:id)

    stop_id_to_update = stop_ids_in_order.delete(stop.id)

    new_stop_ids_in_order = stop_ids_in_order.insert(proposed_order - 1,
                                                     stop_id_to_update)

    new_stop_ids_in_order.each_with_index do |id, index|
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

  def shared_users_except(user)
    users.where.not(id: user.id)
  end

  def unshared_users
    shared_user_ids = users.pluck(:id)
    User.where.not(id: shared_user_ids)
  end

  def shared_to?(user)
    users.include?(user)
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
