describe "/auth/login", type: :request do
  let(:default_email) { 'rspec@globo.com' }
  let(:default_password) { '12345678' }
  let!(:user) { create(:user, name: 'Rspec Test', email: default_email, password: default_password) }

  let(:valid_attributes) { { email: default_email, password: default_password } }
  let(:invalid_attributes) { { email: default_email, password: '123' } }

  describe "POST /auth/login" do
    context "with valid parameters" do
      it "login into application" do
        post '/auth/login', params: valid_attributes, as: :json
        result = JSON.parse(response.body)
        expect(result.keys.sort).to eq(['email', 'exp', 'token'])
      end

      it "renders a JSON response" do
        post '/auth/login', params: valid_attributes, as: :json

        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not login into application" do
        post '/auth/login', params: invalid_attributes, as: :json
        result = JSON.parse(response.body)
        expect(result.keys.sort).to eq(['error'])
      end

      it "renders a JSON response with errors" do
        post '/auth/login', params: invalid_attributes, as: :json
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end
end
