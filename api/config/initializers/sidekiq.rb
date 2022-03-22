require 'sidekiq/web'

Sidekiq.options[:backtrace] = true
Sidekiq.logger = Rails.application.config.active_job.logger

# Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
#   [user, password] == [Rails.application.config.app.sidekiq.username, Rails.application.config.app.sidekiq.password]
# end

Sidekiq.configure_server do |config|
  config.redis = {
    # url: Rails.application.config.app.sidekiq.redis.url,
    # password: Rails.application.config.app.redis.password,
    namespace: 'challenge-api',
    network_timeout: 20
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    # url: Rails.application.config.app.sidekiq.redis.url,
    # password: Rails.application.config.app.redis.password,
    namespace: 'challenge-api'
  }
end