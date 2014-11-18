class Trip < ActiveRecord::Base
  validates :starts_on, presence: true
  validates :city, presence: true

  belongs_to :user

  has_many :stops
  has_many :locations, through: :stops
end
