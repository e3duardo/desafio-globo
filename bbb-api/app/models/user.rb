class User < ApplicationRecord
  enum role: { backstage: 'backstage', viewer: 'viewer' }

  validates :name, :email, presence: true
end
