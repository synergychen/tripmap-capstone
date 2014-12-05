class ArchivesController < ApplicationController
  def create
    trip = load_trip_from_url
    trip.update(completed: true)

    redirect_to :back
  end

  def destroy
    trip = load_trip_from_url
    trip.update(completed: false)

    redirect_to :back
  end

  private

  def load_trip_from_url
    Trip.find(params[:trip_id])
  end
end
