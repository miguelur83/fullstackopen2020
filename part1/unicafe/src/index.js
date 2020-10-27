import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Stats = ({good, neutral, bad}) => {
  if ((good+neutral+bad)===0) return <div><h1>statistics</h1><p>No feedback given.</p></div>
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={neutral+bad+good} />
          <Statistic text="average" value={(good*1+bad*-1)/(good+bad+neutral)} />
          <Statistic text="positive" value={good/(good+bad+neutral)*100+'%'} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text , value}) => {
  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);