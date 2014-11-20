class StopOrdersController < ApplicationController
  def edit
    @stop = load_stop_from_url
    @trip = @stop.trip
    @location = @stop.location
  end

  def update
    stop = load_stop_from_url
    trip = stop.trip

    trip.reorder_stops_after(stop, proposed_order)

    redirect_to trip
  end

  private

  def load_stop_from_url
    Stop.find(params[:stop_id])
  end

  def proposed_order
    params[:stop][:order].to_i
  end
end
