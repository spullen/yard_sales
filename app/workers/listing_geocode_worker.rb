class ListingGeocodeWorker
  include Sidekiq::Worker

  def perform(listing_id)
    listing = Listing.find(listing_id)

    coordinates = Geocoder.coordinates(listing.address)

    listing.latitude = coordinates.first
    listing.longitude = coordinates.last

    listing.save
  end
  
end