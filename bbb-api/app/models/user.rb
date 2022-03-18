class User < ApplicationRecord
  enum role: { backstage: 'backstage', viewer: 'viewer' }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
