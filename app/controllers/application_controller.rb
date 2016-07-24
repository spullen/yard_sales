class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

  def preflight
    render nothing: true
  end

  private

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
    render :head, status: :unauthorized, content_type: 'application/json'
  end

  def render_user_not_authorized
    render :head, status: :unauthorized, content_type: 'application/json'
  end

  def render_record_not_found
    render :head, status: :not_found, content_type: 'application/json'
  end
end
