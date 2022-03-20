require "rails_helper"

RSpec.describe VotesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/votes").to route_to("votes#index")
    end

    it "routes to #create" do
      expect(post: "/votes").to route_to("votes#create")
    end
  end
end
