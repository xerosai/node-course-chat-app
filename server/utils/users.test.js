const expect = require('expect');

const {Users} = require('./users');

describe('users', () => {

    let users;

    beforeEach(() => {

        users = new Users();

        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Marvin',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Jen',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {id: '1234', name: 'Sai', room: 'LOTR'};

        const response = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const id = '1';
        const user = users.removeUser(id);

        expect(users.users.length).toBe(2);
        expect(user.id).toBe(id);
    });

    it('should not remove a user', () => {
        const user = users.removeUser('69');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const id = '1';
        const name = 'Mike';
        const room = 'Node Course';

        const user = users.getUser(id);

        expect(user).toInclude({id, name, room});
    });

    it('should not find user', () => {
        const user = users.getUser('500');
        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Jen']);
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Marvin']);
    });

});
