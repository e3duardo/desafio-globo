class VoteJob < ApplicationJob
  queue_as :default

  def perform(token, brother_id)
    decoded = JsonWebToken.decode(token)
    current_user = User.find_by!(id: decoded[:user_id])

    survey = Survey.find_by!(status: :active)

    @answer = Answer.new({ brother_id: brother_id, user_id: current_user.id, survey_id: survey.id })
  end
end
