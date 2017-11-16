const store = {
  users: [
    {id: 1, email: "test@test.com", password: "123", name: "User1", oauth_provider: null, oauth_id: null}
  ],
  userIdNext: 2,
  contacts: [
    { id: 1, name: "Justin" },
    { id: 2, name: "Judy"},
    { id: 3, name: "NeEddra"}
  ],
  contactsIdCounter: 4,
}

function getOauthUser(provider, providerId) {
  store.users.forEach((user) => {
    if (user.oauth_provider === provider && user.oauth_id === providerId) {
      return user
    }
  })
  return []
}

function createOauthUser(user) {
  store.users.push({
    id: store.users.userIdNext,
    email: null,
    password: null,
    name: null,
    oauth_provider: user.oauth_provider,
    oauth_id: user.oauth_id,
  })
  store.users.userIdNext += 1
}

module.exports = {
  getOauthUser,
  createOauthUser,
};
