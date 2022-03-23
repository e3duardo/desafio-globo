class VoteJob < ApplicationJob
  queue_as :default

  def perform(token, brother_id)
    current_user = get_user!(token)

    return unless survey_has(brother_id)

    @answer = Answer.create!({ brother_id: brother_id, user_id: current_user.id, survey_id: current_survey.id })
  end

  private 

  def get_user!(token)
    decoded = JsonWebToken.decode(token)
    User.find_by!(id: decoded[:user_id])
  end

  def current_survey
    @current_survey ||= Survey.find_by!(status: :active)
  end

  def survey_has(brother_id)
    current_survey.brothers.pluck(:id).include?(brother_id)
  end
end
