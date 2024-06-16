db.createUser({
  user: 'romashkoyp',
  pwd: 'CHY5BxIJ5OoQRT3Q',
  roles: [
    {
      role: 'dbOwner',
      db: 'phoneBook',
    },
  ],
});

db.createCollection('persons');

db.todos.insert({ name: 'Test name', number: '123-1213334434' });