class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :brother
  belongs_to :survey
end
