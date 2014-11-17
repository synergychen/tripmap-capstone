class Trip < ActiveRecord::Base
  validates :starts_on, presence: true
  validates :city, presence: true

  belongs_to :user

  has_many :trip_location_relationships
  has_many :locations, through: :trip_location_relationships
end
