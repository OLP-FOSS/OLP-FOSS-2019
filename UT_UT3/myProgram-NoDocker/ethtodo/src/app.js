App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed()

    const player = await $.getJSON('EloGame.json')
    App.contracts.Player = TruffleContract(player)
    App.contracts.Player.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.player = await App.contracts.Player.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]
      // sq = 
      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskId)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      // .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }
      // Show the task
      $newTaskTemplate.show()
    }

    /// PLAYER
    const taskCount_player = await App.player.taskCountPlayer()
    const $taskTemplate_player = $('.taskTemplate-player')
    // Render out each task with a new task template
    // alert(taskCount_player)
    for (var i = 1; i <= taskCount_player; i++) {
      // Fetch the task data from the blockchain
      const task_player = await App.player.player(i)
      const taskId_player = task_player[0].toNumber()
      const taskElo_player = task_player[1].toNumber()
      // sq = 
      // Create the html for the task
      const $newTaskTemplate_player = $taskTemplate_player.clone()
      $newTaskTemplate_player.find('.content-player').html(taskId_player)
      $newTaskTemplate_player.find('.elo-player').html(taskElo_player)
      $newTaskTemplate_player.find('input')
                      .prop('name', taskId_player)
                      .on('click', App.toggleCompleted_player)
      // Put the task in the correct list
      $('#completedTaskList-player').append($newTaskTemplate_player)
      // $('#taskList-player').append($newTaskTemplate_player)
      // Show the task
      $newTaskTemplate_player.show()


    }
  },
  xetWin: async () => {
    App.setLoading(true)
    await App.player.endGame(playerNumber)
    window.location.reload()
  },
  toggleCompleted_player: async (number) => {
    App.setLoading(true)
    const taskId_player = number.target.name
    await App.player.startGame(taskId_player)
  },
  createTask: async () => {
    App.setLoading(true)
    // const content = $('#newTask').val()
    const content = sq.toString()
    await App.todoList.createTask(content)
    window.location.reload()
  },

 

  createPlayer: async () => {
    App.setLoading(true)
    // const content = $('#newTask').val()
    await App.player.createPlayer()
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    const task = await App.todoList.tasks(taskId)
    const taskContent = task[1]
    var array = taskContent.split(",")
    for (var i = 0; i < noOfRow; i++) {
      for (var j = 0; j < noOfCol; j++) {
        sq[i][j]=array[i*noOfRow + j];
        sqUpdate(i,j);
      }
    }
    // var sq_temp = array
    await App.todoList.toggleCompleted(taskId)
    // window.location.reload()
    // await App.renderTasks()
    // await App.render()
    // sq = sq_temp
    // alert(sq)
    // for (var i = 0; i < 16; i++) {
    //   for (var j = 0; j < 16; j++) {
    //     sqUpdate(i,j);
    //   }
    // }
    // for (var i = 0; i < noOfRow; i++) {
    //   for (var j = 0; j < noOfCol; j++) {
    //     sq[i][j]=array[i*noOfRow + j];
    //     sqUpdate(i,j);
    //   }
    // }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})



