class Location < ActiveRecord::Base
  validates :address, presence: true

  has_many :stops
  has_many :trips, through: :stops
end
