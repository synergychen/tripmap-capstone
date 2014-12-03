class LocationsController < ApplicationController
  def create
    @location = Location.new(location_params)

    if @location.save
      redirect_to :back
    else
      render :new
    end
  end

  private

  def location_params
    params.require(:location).
      permit(:name, :address, :description)
  end
end
