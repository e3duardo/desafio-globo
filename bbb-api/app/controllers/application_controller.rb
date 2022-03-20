class ApplicationController < ActionController::API
  def authorize_request(role = :backstage)
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find_by!(id: @decoded[:user_id])
      raise InvalidRoleError if @current_user.role.to_s != role.to_s

      @current_user
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    rescue InvalidRoleError => e
      render json: { errors: 'Acesso negado' }, status: :forbidden
    end
  end
end
