const Users = artifacts.require('./Users.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Users', () => {
    let users

    before(async () => {
        users = await Users.deployed()
    })

    //test for deploying
    describe('deployment', async () => {
        it('deployes successfully', async() => {
            const address = await users.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    //test for functions
    describe('users', async () => {
        var result, userCount

        //create a user before testing
        before(async () => {
            result = await users.addUser('phongnc', '123456')
            userCount = await users.userCount()
            //console.log(userCount)
        })

        it('saves users', async () => {
            //success
            assert.equal(userCount, 1)
            const event = result.logs[0].args //log of the event
            assert.equal(event.id.toNumber(), userCount.toNumber(), 'id is correct')
            assert.equal(event.username, 'phongnc', 'username is correct')
            assert.equal(event.password, '123456', 'password is correct')
            assert.equal(event.elo.toNumber(), 1200, 'elo is correct')
        })

    })

    //test for getting users
    describe('users', async () => {
        var result, userCount

        //create a user before testing
        before(async () => {
            result = await users.getUser(1)
            userCount = await users.userCount()
            //console.log(userCount)
        })

        it('gets users', async () => {
            //success
            assert.equal(userCount, 1)
            const event = result.logs[0].args //log of the event
            assert.equal(event.id.toNumber(), userCount.toNumber(), 'id is correct')
            assert.equal(event.username, 'phongnc', 'username is correct')
            assert.equal(event.password, '123456', 'password is correct')
            assert.equal(event.elo.toNumber(), 1200, 'elo is correct')
        })

    })

    //test for elo
    describe('elo', async () => {
        var result, userCount

        //create a user before testing
        before(async () => {
            result = await users.updateElo(1, 1300)
            userCount = await users.userCount()
            //console.log(userCount)
        })

        it('updates elo', async () => {
            //success
            assert.equal(userCount, 1)
            const event = result.logs[0].args //log of the event
            assert.equal(event.id.toNumber(), userCount.toNumber(), 'id is correct')
            assert.equal(event.elo.toNumber(), 1300, 'elo is correct')
        })
    })
})