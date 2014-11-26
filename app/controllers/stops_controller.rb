class StopsController < ApplicationController
  before_action :require_ownership

  def new
    @trip = load_trip_from_url
    @stop = @trip.stops.new
  end

  def create
    @trip = load_trip_from_url
    @stop = @trip.stops.new(stop_params.merge(order: @trip.stops.count + 1))

    if @stop.save
      redirect_to @trip
    else
      render :new
    end
  end

  def edit
    @trip = load_trip_from_url
    @stop = load_stop_from_url
  end

  def update
    @trip = load_trip_from_url
    @stop = load_stop_from_url

    @stop.update(stop_params)
    render @stop
  end

  def destroy
    trip = load_trip_from_url
    stop = load_stop_from_url
    stop.destroy
    trip.update_stops_after(stop)

    redirect_to trip
  end

  private

  def load_trip_from_url
    current_user.trips.find(params[:trip_id])
  end

  def load_stop_from_url
    trip = load_trip_from_url
    trip.stops.find(params[:id])
  end

  def stop_params
    params.require(:stop).
      permit(:stay_time, :transportation_mode, :trip_id, :location_id)
  end

  def require_ownership
    trip = Trip.find(params[:trip_id])
    require_owner(trip)
  end
end
