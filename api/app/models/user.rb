class User < ApplicationRecord
  has_secure_password
  enum role: { backstage: 'backstage', viewer: 'viewer' }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end
