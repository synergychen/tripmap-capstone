class LocationsController < ApplicationController
  def create
    @location = Location.new(location_params)

    if @location.save
      render @location
    else
      render partial: "error_messages",
        locals: { target: @location }, status: 422
    end
  end

  private

  def location_params
    params.require(:location).
      permit(:name, :address, :description)
  end
end
