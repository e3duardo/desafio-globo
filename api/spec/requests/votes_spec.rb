describe "/votes", type: :request do
  include_context('default.user')

  let!(:brother) { create(:brother) }
  let!(:survey) { create(:survey, status: :active) }
  before { survey.brothers << brother }
  
  let(:valid_attributes) { { brother_id: brother.id } }
  let(:invalid_attributes) { { brother_id: (brother.id + 2) } }
  
  describe "GET /index" do
    before { Answer.create!(survey: survey, brother: brother, user: user) }
    let(:default_role) { :backstage }

    it "renders a successful response" do
      get votes_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end

    describe "with viewer role" do
      let(:default_role) { :viewer }
  
      it "renders a successful response" do
        get votes_url, headers: valid_headers, as: :json
        result = JSON.parse(response.body)

        expect(response).to have_http_status(:forbidden)
        expect(result.keys.sort).to eq(['errors'])
      end
    end
  end

  describe "POST /create" do
    let(:default_role) { :viewer }

    context "with valid parameters" do
      it "creates a new Answer" do
        expect {
          post votes_url, params: valid_attributes, headers: valid_headers, as: :json
        }.to change(Answer, :count).by(1)
      end

      it "renders a JSON response with the new answer" do
        post votes_url,params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Answer" do
        expect {
          post votes_url, params: invalid_attributes, as: :json
        }.to change(Answer, :count).by(0)
      end

      it "renders a JSON response with errors for the new answer" do
        post votes_url, params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end
end
