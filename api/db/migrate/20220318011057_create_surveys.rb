class CreateSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :surveys do |t|
      t.date :date
      t.string :status, default: 'created'
      t.references :brother_out, null: true, foreign_key: { to_table: :brothers }

      t.timestamps
    end
  end
end
