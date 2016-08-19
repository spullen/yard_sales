if Rails.env.production?
  redis_url = "redis://#{ENV['DB_PORT_5432_TCP_ADDR']}:#{ENV['DB_PORT_5432_TCP_PORT']}/0"

  Sidekiq.configure_server do |config|
    config.redis = { url: redis_url }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: redis_url }
  end
end  