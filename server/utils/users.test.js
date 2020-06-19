const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Bijay',
            room:'Node apk'
        },{
            id:'2',
            name:'Manish',
            room:'React apk'
        },{
            id:'3',
            name:'Ram',
            room:'Node apk'
        }]
    });

    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id:'123',
            name:'John',
            room: 'Offices'
        };
        var resUser = users.addUser(user.id,user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove user',()=>{
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user',()=>{
        var userId = '222';
        var user = users.getUser(userId);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user',()=>{
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toBeUndefined();
    });

    it('should return names of Node apk room', ()=>{
        var userList = users.getUserList('Node apk');
        expect(userList).toEqual(['Bijay','Ram']);
    });

    it('should return names of React apk room', ()=>{
        var userList = users.getUserList('React apk');
        expect(userList).toEqual(['Manish']);
    });
})