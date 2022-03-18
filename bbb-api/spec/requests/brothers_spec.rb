describe "/brothers", type: :request do

  let(:valid_attributes) { attributes_for(:brother) }

  let(:invalid_attributes) { attributes_for(:brother, name: nil) }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # BrothersController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      Brother.create! valid_attributes
      get brothers_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      brother = Brother.create! valid_attributes
      get brother_url(brother), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Brother" do
        expect {
          post brothers_url,
               params: { brother: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Brother, :count).by(1)
      end

      it "renders a JSON response with the new brother" do
        post brothers_url,
             params: { brother: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Brother" do
        expect {
          post brothers_url,
               params: { brother: invalid_attributes }, as: :json
        }.to change(Brother, :count).by(0)
      end

      it "renders a JSON response with errors for the new brother" do
        post brothers_url,
             params: { brother: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        {name: 'Mario'}
      }

      it "updates the requested brother" do
        brother = Brother.create! valid_attributes
        patch brother_url(brother),
              params: { brother: new_attributes }, headers: valid_headers, as: :json
        brother.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the brother" do
        brother = Brother.create! valid_attributes
        patch brother_url(brother),
              params: { brother: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the brother" do
        brother = Brother.create! valid_attributes
        patch brother_url(brother),
              params: { brother: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested brother" do
      brother = Brother.create! valid_attributes
      expect {
        delete brother_url(brother), headers: valid_headers, as: :json
      }.to change(Brother, :count).by(-1)
    end
  end
end
