describe "/surveys", type: :request do
  let(:valid_attributes) { attributes_for(:survey) }

  let(:invalid_attributes) { attributes_for(:survey, date: nil) }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # SurveysController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      Survey.create! valid_attributes
      get surveys_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      survey = Survey.create! valid_attributes
      get survey_url(survey), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Survey" do
        expect {
          post surveys_url,
               params: { survey: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Survey, :count).by(1)
      end

      it "renders a JSON response with the new survey" do
        post surveys_url,
             params: { survey: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Survey" do
        expect {
          post surveys_url,
               params: { survey: invalid_attributes }, as: :json
        }.to change(Survey, :count).by(0)
      end

      it "renders a JSON response with errors for the new survey" do
        post surveys_url,
             params: { survey: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { date: Time.zone.today + 3.days }
      }

      it "updates the requested survey" do
        survey = Survey.create! valid_attributes
        patch survey_url(survey),
              params: { survey: new_attributes }, headers: valid_headers, as: :json
        survey.reload
        expect(survey.date).to eq(Time.zone.today + 3.days)
      end

      it "renders a JSON response with the survey" do
        survey = Survey.create! valid_attributes
        patch survey_url(survey),
              params: { survey: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the survey" do
        survey = Survey.create! valid_attributes
        patch survey_url(survey),
              params: { survey: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested survey" do
      survey = Survey.create! valid_attributes
      expect {
        delete survey_url(survey), headers: valid_headers, as: :json
      }.to change(Survey, :count).by(-1)
    end
  end
end
