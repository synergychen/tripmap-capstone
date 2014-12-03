class Location < ActiveRecord::Base
  validates :name, presence: true
  validates :address, presence: true

  has_many :stops
  has_many :trips, through: :stops

  def name_with_address
    "#{name} (#{address})"
  end
end
