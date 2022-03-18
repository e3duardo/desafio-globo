FactoryBot.define do
  factory :brother do
    name { Faker::Artist.name }
    birth { Faker::Date.birthday(min_age: 18, max_age: 65) }
    status { Brother.regular }
  end
end
