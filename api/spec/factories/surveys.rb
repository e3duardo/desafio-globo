FactoryBot.define do
  factory :survey do
    date { Time.zone.today }
    status { :created }
    brother_out {}
  end
end
