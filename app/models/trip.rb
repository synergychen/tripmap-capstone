class Trip < ActiveRecord::Base
  validates :starts_on, presence: true
  validates :city, presence: true

  belongs_to :user

  has_many :stops
  has_many :locations, through: :stops

  def update_stops_after(deleted_stop)
    stops.each do |stop|
      if stop.order > deleted_stop.order
        stop.update(order: stop.order - 1)
      end
    end
  end
end
