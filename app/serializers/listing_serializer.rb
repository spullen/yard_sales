class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :starts_at, :ends_at, :early_birds_allowed, :address,
             :latitude, :longitude, :street1, :street2, :city, :state, :postal_code, :distance

  def distance
    object.try(:distance)
  end
end