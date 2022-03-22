FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    role { User.viewer }
    password { '12345678' }
  end
end
