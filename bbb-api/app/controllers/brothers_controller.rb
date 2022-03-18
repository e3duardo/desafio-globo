class BrothersController < ApplicationController
  before_action :set_brother, only: [:show, :update, :destroy]

  # GET /brothers
  def index
    @brothers = Brother.all

    render json: @brothers
  end

  # GET /brothers/1
  def show
    render json: @brother
  end

  # POST /brothers
  def create
    @brother = Brother.new(brother_params)

    if @brother.save
      render json: @brother, status: :created, location: @brother
    else
      render json: @brother.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /brothers/1
  def update
    if @brother.update(brother_params)
      render json: @brother
    else
      render json: @brother.errors, status: :unprocessable_entity
    end
  end

  # DELETE /brothers/1
  def destroy
    @brother.destroy
  end

  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_brother
    @brother = Brother.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def brother_params
    params.require(:brother).permit(:name, :birth, :status)
  end
end
