describe "/surveys", type: :request do
  include_context('default.user')

  let!(:survey) { create(:survey) }

  describe "GET /index" do
    let(:request) { get surveys_url, headers: valid_headers, as: :json }

    it "renders a successful response" do
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    let(:request) { get survey_url(survey), headers: valid_headers, as: :json }

    it "renders a successful response" do
      request
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    let!(:survey) { build(:survey).attributes }

    context "with valid parameters" do
      let(:request) { post surveys_url, params: { survey: survey }, headers: valid_headers, as: :json }

      it "creates a new Survey" do
        expect { request }.to change(Survey, :count).by(1)
      end

      it "renders a JSON response with the new survey" do
        request
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      let(:request) { post surveys_url, params: { survey: { date: nil } }, headers: valid_headers, as: :json }

      it "does not create a new Survey" do
        expect { request }.to change(Survey, :count).by(0)
      end

      it "renders a JSON response with errors for the new survey" do
        request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:request) { patch survey_url(survey), params: { survey: { status: 'active' } }, headers: valid_headers, as: :json }

      it "updates the requested survey" do
        expect { request }.to change { survey.reload.status }.from('created').to('active')
      end

      it "renders a JSON response with the survey" do
        request
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      let(:request) { patch survey_url(survey), params: { survey: { status: 'done' } }, headers: valid_headers, as: :json }

      it "renders a JSON response with errors for the survey" do
        request
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    let(:request) { delete survey_url(survey), headers: valid_headers, as: :json }

    it "destroys the requested survey" do
      expect { request }.to change { survey.reload.status }.from('created').to('done')
    end
  end
end
