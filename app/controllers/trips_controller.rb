class TripsController < ApplicationController
  def index
    @trips = current_user.trips
  end

  def new
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
      permit(:starts_on, :city, :completed)
  end
end
