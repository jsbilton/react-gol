const React = require('react')
const gol = require('gol-functional')

const App = React.createClass({
  getInitialState() {
    return {
      board: [
        [0,0],
        [0,1],
        [1,0]
      ],
      sim: null
    }
  },
  componentDidMount() {
    const sim = gol({
      size: 20,
      speed: 1000,
      generate: true // if false nothing shows up
    }, (board) => {
      this.setState({board})
    })
      this.setState({sim})
  },
  start () {
    this.state.sim.start()
  },
  stop () {
    this.state.sim.stop()
  },
  toggle(row, col) {
  // this willl run on every render
    return e => {
      this.state.sim.toggle(row, col)
      const board = this.state.board
      board[row][col] === 1 ? board[row][col] === 0 : board[row][col] = 1
      this.setState({board})
    }
  },
  render() {
    const td = rowIndex => (cell, colIndex) =>
      <td
        onClick={this.toggle(rowIndex, colIndex)}
        className={cell === 1 ? 'bg-blue' : ''}
        style={{height: '60px', minWidth: '60px'}}>
          {}
      </td>

    const tr = (row, rowIndex) =>
      <tr>
        {row.map(td(rowIndex))}
      </tr>

    return (
      <div>
        <h1>Game of Life</h1>
        <div>
          <button onClick={this.start}>
            Start
          </button>
          <button onClick={this.stop}>
            Stop
          </button>
          <hr/>
        </div>
        <main>
          <table>
            {
              this.state.board.map(tr)
            }
          </table>
        </main>
      </div>
    )
  }
})

module.exports = App
