class TripGroupsController < ApplicationController
  def index
    @trip = load_trip_from_url
    @shared_users = @trip.shared_users_except(current_user)
    @unshared_users = @trip.unshared_users
  end

  private

  def load_trip_from_url
    current_user.trips.find(params[:trip_id])
  end
end
