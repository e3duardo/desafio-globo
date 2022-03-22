RSpec.shared_context 'default.user' do
  let(:default_email) { 'rspec@globo.com' }
  let(:default_password) { '12345678' }
  let(:default_role) { :backstage }
  let!(:user) { create(:user, name: 'Rspec Test', email: default_email, password: default_password, role: default_role) }

  before { post '/auth/login', params: { email: default_email, password: default_password} }
  let(:token) { JSON.parse(response.body).dig('token') }

  let(:valid_headers) { { 'Authorization': "Bearer #{token}" } }
end