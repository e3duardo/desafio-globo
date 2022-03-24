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

    let(:request) { get votes_url, headers: valid_headers, as: :json }

    it "renders a successful response" do
      request
      expect(response).to be_successful
    end

    describe "with viewer role" do
      let(:default_role) { :viewer }
  
      it "renders a successful response" do
        request
        result = JSON.parse(response.body)
        expect(response).to have_http_status(:forbidden)
        expect(result.keys.sort).to eq(['errors'])
      end
    end
  end

  describe "POST /create" do
    let(:default_role) { :viewer }

    context "with valid parameters" do
      let(:request) { post votes_url, params: valid_attributes, headers: valid_headers, as: :json }

      it "creates a new Answer" do
        ActiveJob::Base.queue_adapter = :test
        expect { request }.to have_enqueued_job(VoteJob)
      end

      it "renders a JSON response with the new answer" do
        request
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      let(:request) { post votes_url, params: invalid_attributes, headers: valid_headers, as: :json }

      it "does not create a new Answer" do
        ActiveJob::Base.queue_adapter = :test
        expect { request }.to have_enqueued_job(VoteJob)
      end

      it "renders a JSON response with errors for the new answer" do
        request
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json")
      end
    end
  end
end
