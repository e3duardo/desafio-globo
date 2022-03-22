class VoteJob < ApplicationJob
  queue_as :default

  def perform(user_id, brother_id)
    survey = Survey.find_by!(status: :active)

    @answer = Answer.new({ brother_id: brother_id, user_id: user_id, survey_id: survey.id })
  end
end
