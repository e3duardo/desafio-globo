class SurveyBlueprint < Blueprinter::Base
  identifier :id

  fields :date, :status, :brother_out_id

  association :brothers, blueprint: BrotherBlueprint

  field :total_votes do |survey, options|
    Answer.where(survey: survey).count
  end

  field :total_votes_per_brother do |survey, options|
    survey.brothers.map do |brother| 
      { brother_id: brother.id, total_votes: Answer.where(survey_id: survey.id, brother_id: brother.id).count } 
    end
  end

  field :total_votes_at_last_hour do |survey, options|
    Answer.where(survey: survey, created_at: [Time.zone.now - 1.hour..Time.zone.now]).count
  end
end
