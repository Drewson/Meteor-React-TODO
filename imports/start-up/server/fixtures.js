import { Meteor } from 'meteor/meteor';
import { ToDos } from '../../api/todos';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {

  let userId = '';

  if ( Meteor.users.find().count() === 0) {
    userId = Accounts.createUser({
      email: 'bilbo@bilbo.com',
      password: '666666'
    })
  }

  if ( ToDos.find().count() === 0 ) {
    ToDos.insert({
      title: 'Learn React', 
      complete: false,
      owner: userId
    });
  }
});