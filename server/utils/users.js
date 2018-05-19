
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//     constructor(name, age) {
//         console.log(name, age);
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }
//
// const me = new Person('Simon', 25);
// me.getUserDescription();

class Users {
    constructor() {
        this.users = [];
    }

    /**
     * @description Adds a user to the user array
     */
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    /**
     * @description Removes a user from the list
     */
    removeUser(id) {
        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    /**
     * @description Gets a user by id
     */
    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    /**
     *
     */
    getUserList(room) {
        const users = this.users.filter((item) => {
            return item.room === room;
        });

        return users.map(item => item.name);


    }
}

module.exports = {Users};
