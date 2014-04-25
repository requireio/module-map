let getNames = (...users) => {
  return users.map(user => user.name)
}

let users = [{name: 'Hugh'}, {name: 'Tim'}]

module.exports = getNames(...users)
