class CreateJoinTableSurveyBrother < ActiveRecord::Migration[6.1]
  def change
    create_join_table :surveys, :brothers do |t|
      t.index [:survey_id, :brother_id]
      t.index [:brother_id, :survey_id]
    end
  end
end
