import { SymfoboClient } from '@symfobo/client';
/*
  * Description: UserAdapter est une class qui gère les utilisateurs de l'application.
* */
const UserAdapter = (config) => {
  return {
    async createUser(user) {
      return SymfoboClient.post('/api/users', user);
    },
    async getUser(userId) {
      return SymfoboClient.get(`/api/users/${userId}`);
    },
    async getUserByEmail(email) {
      return SymfoboClient.get(`/api/users?email=${email}`);
    },
    async getUserByAccount({providerAccountId, provider}) {
      return SymfoboClient.get(`/api/users?providerAccountId=${providerAccountId}&provider=${provider}`);
    },
    async updateUser(userId,user) {
      return SymfoboClient.put(`/api/users/${userId}`, user);
    },
    async deleteUser(userId) {
      return SymfoboClient.delete(`/api/users/${userId}`);
    },
    async linkAccount(account) {
      return SymfoboClient.post('/api/accounts', account);
    },
    async unlinkAccount({providerAccountId, provider}) {
      return SymfoboClient.delete(`/api/accounts?providerAccountId=${providerAccountId}&provider=${provider}`);
    },
    async createSession({sessionToken, userId, expires}) {
      return SymfoboClient.post('/api/sessions', {sessionToken, userId, expires});
    },
    async getSessionAndUser(sessionToken) {
      return SymfoboClient.get(`/api/sessions?sessionToken=${sessionToken}`);
    },
    async updateSession(session) {
      return SymfoboClient.put(`/api/sessions?sessionToken=${session.sessionToken}`, session);
    },
    async deleteSession(sessionToken) {
      return SymfoboClient.delete(`/api/sessions?sessionToken=${sessionToken}`);
    },
    async createVerificationRequest({identifier, token, expires}) {
      return SymfoboClient.post('/api/verification-requests', {identifier, token, expires});
    }
  }
}

export default UserAdapter;