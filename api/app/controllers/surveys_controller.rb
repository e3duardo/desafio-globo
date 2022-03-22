class SurveysController < ApplicationController
  before_action :authorize_request
  before_action :set_survey, only: [:show, :update, :destroy]

  # GET /surveys
  def index
    @surveys = Survey.all

    render json: @surveys
  end

  # GET /surveys/1
  def show
    render json: @survey
  end

  # POST /surveys
  def create
    brothers_ids = params.dig(:survey, :brothers_ids)

    @survey = Survey.new(survey_params)
    if @survey.save
      @survey.brothers = Brother.where(id: brothers_ids)
    
      render json: @survey, status: :created, location: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /surveys/1
  def update
    status = params.dig(:survey, :status)
    return render json: { errors: 'Status inválido' }, status: :unprocessable_entity unless ['created', 'active'].include?(status)

    brothers_ids = params.dig(:survey, :brothers_ids)

    if @survey.update(status: status)
      @survey.brothers = Brother.where(id: brothers_ids) if brothers_ids.present?

      render json: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  # DELETE /surveys/1
  def destroy
    @survey.destroy
  end

  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_survey
    @survey = Survey.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_params
    params.require(:survey).permit(:date)
  end
end
