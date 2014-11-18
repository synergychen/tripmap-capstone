class Location < ActiveRecord::Base
  validates :address, presence: true

  has_many :trip_location_relationships
  has_many :trips, through: :trip_location_relationships

  def order_of(trip)
    trip_loc_relation = load_trip_location_relationship(trip)
    trip_loc_relation.order
  end

  def stay_time_of(trip)
    trip_loc_relation = load_trip_location_relationship(trip)
    trip_loc_relation.stay_time
  end

  private

  def load_trip_location_relationship(trip)
    TripLocationRelationship.where(
      trip_id: trip.id,
      location_id: id
    ).first
  end
end
