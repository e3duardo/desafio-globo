class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :role, default: 'viewer'

      t.index :email, unique: true

      t.timestamps
    end
  end
end
