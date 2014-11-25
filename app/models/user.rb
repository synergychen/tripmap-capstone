class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true

  has_many :trip_groups
  has_many :trips, through: :trip_groups

  def owner?(trip)
    id == trip.owner_id
  end
end
