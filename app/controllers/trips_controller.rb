class TripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new
    if @trip.update(trip_params)
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:date, :city, :completed)
  end
end
