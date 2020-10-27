import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(0)

  var largest= 0;
  var largesti = 0;
  let i= 0;
  console.log(points)
  console.log(points.length)
  for (i=0; i<points.length; i++){
    console.log(points[i]+ "at"+i)
      if (points[i]>largest) {
          largest=points[i]
          largesti=i
      }
  }
  console.log("largest "+largest+" at "+largesti)
  
  if (isNaN(points[selected])) {
    let copy = zeroFilledArray(6)
    setPoints(copy)
  } 
  
  const handleClick = () => {
    setSelected(randomIntFromInterval(0,5))
  }
    
  const handleVote = () => {
    let copy = [...points]
    copy[selected] +=1;
    setPoints(copy)
  }
  
  return (
    <div>
      <h1>anecdote of the day:</h1>
      <p>{props.anecdotes[selected]}<br />has {points[selected]} votes.</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>display anecdote</button>
      <h1>anecdote with the most votes:</h1>
      <p>{props.anecdotes[largesti]}<br />has {points[largesti]} votes.</p>
    </div>
  )
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const zeroFilledArray = (length) => {
  return Array.apply(null, new Array(length)).map(Number.prototype.valueOf,0)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)