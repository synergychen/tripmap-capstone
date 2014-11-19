class StopsController < ApplicationController
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

    if @stop.update(stop_params)
      redirect_to @trip
    else
      render :edit
    end
  end

  def destroy
    trip = load_trip_from_url
    stop = load_stop_from_url
    stop.destroy

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
end
