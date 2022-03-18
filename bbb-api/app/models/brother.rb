class Brother < ApplicationRecord
  has_and_belongs_to_many :surveys

  enum status: { regular: 'regular', out: 'out' }

  validates :name, :birth, presence: true
end
