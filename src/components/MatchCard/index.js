// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  const {
    man_of_the_match: manOfMatch,
    competing_team: competingTeam,
    competing_team_logo: competingTeamLogo,
    first_innings: firstInnings,
    second_innings: secondInnings,
    match_status: matchStatus,
    result,
  } = eachMatch
  const changeFont = matchStatus === 'Lost' ? 'fontRed' : 'fontGreen'
  return (
    <div className="matchCard-bg">
      <li>
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          height="150px"
          width="150px"
        />
        <p>{competingTeam}</p>
        <p>{result}</p>
        <p className={changeFont}>{matchStatus}</p>
      </li>
    </div>
  )
}

export default MatchCard
