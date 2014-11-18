# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141118191243) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: true do |t|
    t.string   "name"
    t.string   "address",     null: false
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "stops", force: true do |t|
    t.integer  "trip_id",             null: false
    t.integer  "location_id",         null: false
    t.integer  "order",               null: false
    t.integer  "stay_time",           null: false
    t.string   "transportation_mode"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "stops", ["order"], name: "index_stops_on_order", unique: true, using: :btree
  add_index "stops", ["trip_id", "location_id"], name: "index_stops_on_trip_id_and_location_id", unique: true, using: :btree

  create_table "trips", force: true do |t|
    t.string   "city"
    t.boolean  "completed",  default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "user_id",                    null: false
    t.datetime "starts_on",                  null: false
  end

  add_index "trips", ["user_id"], name: "index_trips_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
