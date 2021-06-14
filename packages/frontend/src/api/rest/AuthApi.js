class AuthApi {
  constructor({ client }) {
    this.client = client;
  }

  login(data) {
    return this.client.post('/login', data);
  }

  signup(data) {
    return this.client.post('/signup', data);
  }

  refresh(data) {
    return this.client.post('/refresh', data);
  }
}

export default AuthApi;
