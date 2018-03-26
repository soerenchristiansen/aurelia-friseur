declare const IS_DEV_BUILD: boolean;

const appHost = IS_DEV_BUILD ? "http://localhost:49878" : "https://friseur.herokuapp.com/";

export default {
  client_id: 'AureliaFriseur',
  token_endpoint: `${appHost}/connect/token`,
  scope: 'openid profile offline_access WebAPI',
  response_type: 'id_token token',
  userinfo_endpoint: `${appHost}/connect/userinfo`,
  end_session_endpoint: `${appHost}/connect/endsession`
}