const SaveGames = artifacts.require('./SaveGames.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SaveGames', () => {
    let saveGames

    before(async () => {
        saveGames = await SaveGames.deployed()
    })

    //test for deploying
    describe('deployment', async () => {
        it('deployes successfully', async() => {
            const address = await saveGames.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    //test for functions
    describe('games', async () => {
        var result, gameCount

        //create a product before testing
        before(async () => {
            var _posxX = [], _posyX = [], _posxO = [], _posyO = []
            _posxX.push(3)
            _posyX.push(1)
            result = await saveGames.saveGame(_posxX, _posyX, _posxO, _posyO, 0)
            gameCount = await saveGames.gameCount()
            //console.log(gameCount)
        })

        it('saves games', async () => {
            //success
            assert.equal(gameCount, 1)
            const event = result.logs[0].args //log of the event
            assert.equal(event.id.toNumber(), gameCount.toNumber(), 'id is correct')
        })

        it('loads products', async () => {
            //success
            result = await saveGames.loadGame(gameCount)

            //check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), gameCount.toNumber(), 'id is correct')
            assert.equal(event.posxX.length, 1, 'position is correct')
            assert.equal(event.posyX.length, 1, 'position is correct')
            assert.equal(event.status, 0, 'status is correct')
        })
    })
})