describe BrothersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/brothers").to route_to("brothers#index")
    end

    it "routes to #show" do
      expect(get: "/brothers/1").to route_to("brothers#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/brothers").to route_to("brothers#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/brothers/1").to route_to("brothers#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/brothers/1").to route_to("brothers#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/brothers/1").to route_to("brothers#destroy", id: "1")
    end
  end
end
