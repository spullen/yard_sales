class Listing < ApplicationRecord
  self.per_page = 25

  # Default to 15 miles
  DEFAULT_DISTANCE = 5

  validates :starts_at, presence: true
  validates :ends_at, presence: true
  validates :street1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :postal_code, presence: true

  # TODO: validtion for starts_at in the future, and ends_at is greater than starts_at

  def self.query(params)
    by_coordinates(params[:latitude], params[:longitude], params[:distance])
      .upcoming(params[:starts])
  end

  def self.by_coordinates(latitude, longitude, distance = nil)
    if latitude.nil? || longitude.nil?
      return all
    end

    query_params = {
      latitude: latitude,
      longitude: longitude,
      distance: (distance || DEFAULT_DISTANCE)
    }

    select = "listings.*, round((point(longitude, latitude) <@> point(%{longitude}, %{latitude}))::numeric, 5) as distance" % query_params
    order = "(point(longitude, latitude) <-> point(%{longitude}, %{latitude})) asc" % query_params

    select(select)
      .where('point(longitude, latitude) <@> point(:longitude, :latitude) <= :distance', query_params)
      .order(order)
  end

  def self.upcoming(starts = nil)
    starts = Time.now.utc if starts.nil?
    where('starts_at >= :starts OR ends_at >= :starts', starts: starts)
      .order(starts_at: :asc)
  end

  def address
    return @address if defined?(@address)

    address_parts = []

    address_parts << street1
    address_parts << street2 unless street2.blank?
    address_parts << "#{city}, #{state} #{postal_code}"

    @address = address_parts.join("\n").strip
  end
end
