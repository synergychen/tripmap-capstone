class Trip < ActiveRecord::Base
  validates :date, presence: true
  validates :city, presence: true
  validates :completed, presence: true

  belongs_to :user
end
