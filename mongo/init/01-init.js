 db.users.drop()
 db.users.createIndex({id: 1}, {unique: true})
 db.users.createIndex({username: 1}, {unique: true})