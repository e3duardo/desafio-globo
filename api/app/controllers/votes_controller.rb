class VotesController < ApplicationController
  before_action only: [:index] do
    authorize_request(:backstage)
  end

  # GET /votes
  def index
    @answers = Answer.all

    render json: @answers
  end

  # POST /votes
  def create
    token = request.headers['Authorization']
    token = token.split(' ').last if token

    VoteJob.perform_later(token, answer_params[:brother_id])

    head :ok
  end

  private

  # Only allow a list of trusted parameters through.
  def answer_params
    params.permit(:brother_id, :vote)
  end
end
