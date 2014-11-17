class Location < ActiveRecord::Base
  validates :address, presence: true

  has_many :trip_location_relationships
  has_many :trips, through: :trip_location_relationships
end
