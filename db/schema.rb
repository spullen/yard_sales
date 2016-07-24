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

ActiveRecord::Schema.define(version: 20160723164723) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "listings", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "starts_at",                                                   null: false
    t.datetime "ends_at",                                                     null: false
    t.boolean  "early_birds_allowed",                         default: false
    t.string   "street1",                                                     null: false
    t.string   "street2"
    t.string   "city",                                                        null: false
    t.string   "state",                                                       null: false
    t.string   "postal_code",                                                 null: false
    t.decimal  "longitude",           precision: 9, scale: 6
    t.decimal  "latitude",            precision: 9, scale: 6
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
    t.index "point((longitude)::double precision, (latitude)::double precision)", name: "listings_point", using: :gist
  end

end
