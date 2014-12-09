module ApplicationHelper
  TRANSPORTATION_MODE = ["WALKING", "TRANSIT", "DRIVING", "BICYCLING"]
  WAYPOINTS_TRANS_MODE = [["Driving", "DRIVING"], ["Walking", "WALKING"],
                          ["Bicycling", "BICYCLING"]]

  def mode_select
    select_tag "mode-select-tag", options_for_select(WAYPOINTS_TRANS_MODE)
  end
end
