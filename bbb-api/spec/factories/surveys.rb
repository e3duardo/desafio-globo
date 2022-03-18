FactoryBot.define do
  factory :survey do
    date { Faker::Date.forward(days: 7) }
    status { Survey.created }
    brother_out {}
  end
end
