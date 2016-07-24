class ListingsSerializer < ActiveModel::Serializer
  attributes :current_page, :next_page, :previous_page, :total_pages, :total_entries, :per_page
  
  has_many :listings, serializer: ListingSerializer

  def listings
    object
  end

  def current_page
    object.current_page
  end

  def next_page
    object.next_page
  end

  def previous_page
    object.previous_page
  end

  def total_pages
    object.total_pages
  end

  def total_entries
    object.total_entries
  end

  def per_page
    object.per_page
  end

end