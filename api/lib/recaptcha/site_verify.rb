module Recaptcha
  class SiteVerify
    SITE_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

    def initialize(token)
      @token = token
    end

    def verify!
      response = HTTParty.post(SITE_VERIFY_URL, body: { secret: Rails.application.credentials.recaptcha.private_key, response: @token })
      body = JSON.parse(response.body)
      body['success']
    end
  end
end
