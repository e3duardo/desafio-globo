class Survey < ApplicationRecord
  belongs_to :brother_out, class_name: 'Brother', optional: true
  has_and_belongs_to_many :brothers, optional: true

  enum status: { created: 'created', active: 'active', done: 'done' }

  validates :date, presence: true, uniqueness: true
end
