class VotesController < ApplicationController
  before_action only: [:index] do
    authorize_request(:backstage)
  end
  # before_action only: [:create] do
  #   authorize_request(:viewer)
  # end

  # GET /votes
  def index
    @answers = Answer.all

    render json: @answers
  end

  # POST /votes
  def create
    # survey = Survey.find_by!(status: :active)

    # @answer = Answer.new(answer_params.merge(user_id: @current_user.id, survey_id: survey.id))

    # if @answer.save
    #   render json: @answer, status: :created
    # else
    #   render json: @answer.errors, status: :unprocessable_entity
    # end
    head :ok
  end

  private

  # Only allow a list of trusted parameters through.
  def answer_params
    params.permit(:brother_id)
  end
end
