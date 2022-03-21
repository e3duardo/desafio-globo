class CreateBrothers < ActiveRecord::Migration[6.1]
  def change
    create_table :brothers do |t|
      t.string :name
      t.string :avatar
      t.text :resume
      t.date :birth
      t.string :status, default: 'regular'

      t.timestamps
    end
  end
end
