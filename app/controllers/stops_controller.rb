class StopsController < ApplicationController
  def new
    @trip = load_trip_from_url
    @stop = @trip.stops.new
  end

  def create
    @trip = load_trip_from_url
    @stop = @trip.stops.new(stop_params)

    if @stop.save
      redirect_to @trip
    else
      render :new
    end
  end

  private

  def load_trip_from_url
    current_user.trips.find(params[:trip_id])
  end

  def stop_params
    params.require(:stop).
      permit(:order, :stay_time, :transportation_mode,
             :trip_id, :location_id)
  end
end
