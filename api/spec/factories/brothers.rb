FactoryBot.define do
  factory :brother do
    name { Faker::Artist.name }
    avatar { Faker::Avatar.image }
    gshow_url { Faker::Internet.url }
    status { Brother.regular }
  end
end
