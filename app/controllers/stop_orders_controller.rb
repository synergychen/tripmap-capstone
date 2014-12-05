class StopOrdersController < ApplicationController
  before_action :require_ownership

  def edit
    @stop = load_stop_from_url
    @trip = @stop.trip
    @location = @stop.location
  end

  def update
    stop = load_stop_from_url
    trip = stop.trip

    trip.update_stop_order_after(stop, proposed_order)

    render trip
  end

  private

  def load_stop_from_url
    Stop.find(params[:stop_id])
  end

  def proposed_order
    params[:stop][:order].to_i
  end

  def require_ownership
    stop = load_stop_from_url
    require_owner(stop.trip)
  end
end
