import 'isomorphic-fetch'

class UserSvc {

  getUserInfo() {
    return fetch('/api/user/info');
  }

}

export default new UserSvc();