require 'sidekiq/web'

Sidekiq.options[:backtrace] = true
Sidekiq.logger = Rails.application.config.active_job.logger

# Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
#   [user, password] == [Rails.application.config.app.sidekiq.username, Rails.application.config.app.sidekiq.password]
# end

Sidekiq.configure_server do |config|
  config.redis = {
    url: 'redis://172.20.0.4:6379',
    # password: Rails.application.config.app.redis.password,
    namespace: 'challenge-api',
    network_timeout: 20
  }

  config.server_middleware do |chain|
    require 'prometheus_exporter/instrumentation'
    chain.add PrometheusExporter::Instrumentation::Sidekiq
  end
  
  config.on :startup do
    require 'prometheus_exporter/instrumentation'
    PrometheusExporter::Instrumentation::ActiveRecord.start(
      custom_labels: { type: "sidekiq" }, #optional params
      config_labels: [:database, :host] #optional params
    )
  end
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: 'redis://172.20.0.4:6379',
    # password: Rails.application.config.app.redis.password,
    namespace: 'challenge-api'
  }
end