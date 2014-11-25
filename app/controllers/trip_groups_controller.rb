class TripGroupsController < ApplicationController
  def show
    @trip = load_trip_from_url
    @shared_users = @trip.shared_users_except(current_user)
    @unshared_users = @trip.unshared_users
  end

  def create
    trip = load_trip_from_url
    user = load_user_from_url
    trip.users << user

    redirect_to trip_trip_groups_path(trip)
  end

  def destroy
    trip = load_trip_from_url
    user = load_user_from_url
    trip.users.destroy(user)

    redirect_to trip_trip_groups_path(trip)
  end

  private

  def load_trip_from_url
    current_user.trips.find(params[:trip_id])
  end

  def load_user_from_url
    User.find(params[:user_id])
  end
end
