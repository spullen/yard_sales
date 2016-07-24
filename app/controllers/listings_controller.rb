class ListingsController < ApplicationController

  def index
    listings = Listing.query(listings_query_params).page(params[:page])
    render json: listings, serializer: ListingsSerializer
  end

  def create
    listing = Listing.new(listing_params)
    if listing.save
      ListingGeocodeWorker.perform_async(listing.id)
      render json: listing
    else
      render json: listing.errors, status: :unprocessable_entity
    end
  end

  private

  def listings_query_params
    params.permit(:latitude, :longitude, :distance, :starts)
  end

  def listing_params
    params.permit(:title, :description, :starts_at, :ends_at, :early_birds_allowed, :street1, :street2, :city, :state, :postal_code)
  end

end