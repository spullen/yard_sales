class AddCubeAndEarthdistanceExtensions < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'cube' unless extension_enabled?('cube')
    enable_extension 'earthdistance' unless extension_enabled?('earthdistance')

    execute('CREATE INDEX listings_point ON listings USING gist (point(longitude, latitude))')
  end
end
