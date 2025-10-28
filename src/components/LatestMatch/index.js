// Write your code here
import './index.css'

const LatestMatch = props => {
  const {eachMatch} = props
  const {
    umpires,
    result,
    id,
    date,
    venue,
    man_of_the_match: manofMatch,
    competing_team_logo: competingTeamLogo,
    competing_team: competingTeam,
    first_innings: firstInnings,
    second_innings: secondInnings,
  } = eachMatch

  return (
    <div className="latestmatch-bg">
      <div>
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        height="200px"
        width="300px"
      />
      <div>
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man of the Match</p>
        <p>{manofMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
