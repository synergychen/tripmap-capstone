class Trip < ActiveRecord::Base
  validates :date, presence: true
  validates :city, presence: true

  belongs_to :user
end
