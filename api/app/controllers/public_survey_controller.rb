class PublicSurveyController < ApplicationController
  before_action only: [:active] do
    authorize_request(:viewer)
  end

  # GET /public-survey
  def index
    @survey = Survey.find_by(status: :active) || Survey.where(status: :done).last

    if @survey.present?
      render json: @survey.to_json(include: :brothers)
    else
      render json: {error: 'Paredão não encontrado'}, status: :not_found
    end
  end
end
