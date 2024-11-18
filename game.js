import { render } from "./suiweb.js"
import { checkForVictor } from "./winCheck.js"

const ROWS = 6
const COLUMNS = 7
const PLAYERS = ['b', 'r']
const EMPTY = ' '

let state = {
  board: Array(ROWS).fill(EMPTY).map(el => Array(COLUMNS).fill(EMPTY)),
  currentPlayer: PLAYERS[0],
  winner: null,
  stackOfMoves: []
}

function resetGame() {
    state.board = Array(ROWS).fill(EMPTY).map(el => Array(COLUMNS).fill(EMPTY))
    state.currentPlayer = PLAYERS[0]
    state.stackOfMoves = []
    state.winner = null
    renderApp()
    showMessage("Its " + state.currentPlayer + "'s turn")
}

function switchPlayer() {
    if (state.currentPlayer === 'b') state.currentPlayer = 'r'
    else if (state.currentPlayer === 'r') state.currentPlayer = 'b'
    showMessage("Its " + state.currentPlayer + "'s turn")
}

function renderApp() {
    const app = document.querySelector(".app")
    render([App], app)  
}

function undo(current) {
    if (state.stackOfMoves.length > 0) {
        const lastMove = state.stackOfMoves.pop()
        let row = lastMove[0]
        let col = lastMove[1]
        current.board[row][col] = EMPTY
        let field = document.getElementById(`${row}-${col}`)
        field.childNodes.forEach(child => field.removeChild(child))
        switchPlayer()
    }
  }

function setChip(e) {  

    if (state.winner != null) {
        return
    }
    
    let target = e.target
    if (target.className !== "field") target = target.parentElement
    let row = parseInt(target.id.substring(0,1))
    let col = parseInt(target.id.substring(2,3))
    
    //Piece slides down
    while (state.board[row+1] !== undefined 
        && state.board[row][col] === EMPTY 
        && state.board[row + 1][col] === EMPTY) {
            row++
    }
    //Set Piece on top of existing pieces
    while(state.board[row][col] !== EMPTY 
       && state.board[row-1] !== undefined) {
            row--
    }
    //Stack is full, dont do shit
    if (state.board[row][col] !== EMPTY) return
    
    state.board[row][col] = state.currentPlayer
    state.stackOfMoves.push([row, col])
    let field = document.getElementById(`${row}-${col}`)
    render([Chip, { color: state.currentPlayer }], field)
    
    state.winner = checkForVictor(state.board)
    if (state.winner != null) {
        showMessage("" +  state.winner + " has won the game!")
        return
    }
    
    switchPlayer()
}

//Tinker with the renderApp funtion to render all pieces
function loadState() {
  state = JSON.parse(localStorage.getItem("state"))
  renderApp()
}

function saveState() {
  localStorage.setItem("state", JSON.stringify(state))
}

function showMessage(message) {
  const container = document.querySelector(".infotext")
  const text = [Message, { text: message }]
  render(text, container)

}

const Controls = () => {
    return [
      "div",
      { className: "controls" },
      ["button", { onclick: () => loadState(), className: "btn-load"}, "Load"],
      ["button", { onclick: () => saveState(), className: "btn-save"}, "Save"],
      ["button", { onclick: () => resetGame(), className: "btn-reset"}, "Reset"],
      ["button", { onclick: () => undo(state), className: "btn-undo"},"Undo" ],
      ["button", { onclick: () => window.open("/doc/Connect4.pdf"), className: "btn-help"}, "Help"]
    ]
  }

const App = () => ["div",
  [Board, { board: state.board }],
  [Controls],
  [TextField]  
]

const TextField = () => {
    return ["div", { className: "infotext" }]
}

const Message = ({ text }) =>
    ["div", { className: "message " },
        ["p", {}, text]]

const Board = ({ board }) => {
  let fields = []
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      fields.push(
        [Field, { color: board[row][col], id: `${row}-${col}` }]
      )
    }
  }
  return (
    ["div", { onclick: (e) => setChip(e), className: "board" }, ...fields]
  )
}

const Chip = ({ color }) => ["div", { className: `piece ${color}` }]

const Field = ({ color, id }) => {
  let piece = color === EMPTY ? null : [Chip, { color }]
  return ["div", { id: id, className: "field" }, piece]
}

resetGame()
