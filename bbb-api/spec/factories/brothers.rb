FactoryBot.define do
  factory :brother do
    name { Faker::Artist.name }
    avatar { Faker::Avatar.image }
    birth { Faker::Date.birthday(min_age: 18, max_age: 65) }
    status { Brother.regular }
  end
end
