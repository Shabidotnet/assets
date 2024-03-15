class User {
  constructor(data, headers) {
    this.data = data;
    this.headers = headers;
  }
  getToken() {
    return {
      "client": this.headers.client,
      "access-token": this.headers.access-token,
      "uid": this.headers.uid,
    };
  }
}

export default User;
