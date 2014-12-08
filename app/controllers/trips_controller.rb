class TripsController < ApplicationController
  before_action :require_ownership, only: [:edit, :update, :destroy]

  def index
    @incoming_trips = current_user.incoming_trips
    @archived_trips = current_user.archived_trips
    @trip = current_user.trips.new
  end

  def create
    @trip = current_user.trips.new(trip_params)
    if @trip.save
      current_user.trips << @trip
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @trip = load_trip_from_url
    @stop = @trip.stops.new
    @location = Location.new
  end

  def edit
    @trip = load_trip_from_url
  end

  def update
    @trip = load_trip_from_url
    if @trip.update(trip_params)
      redirect_to @trip
    else
      render :edit
    end
  end

  def destroy
    trip = load_trip_from_url
    current_user.trips.destroy(trip)
    redirect_to trips_path
  end

  private

  def load_trip_from_url
    current_user.trips.find(params[:id])
  end

  def trip_params
    params.require(:trip).
      permit(:starts_on, :city, :completed).
      merge(owner_id: current_user.id)
  end

  def require_ownership
    trip = Trip.find(params[:id])
    require_owner(trip)
  end
end
