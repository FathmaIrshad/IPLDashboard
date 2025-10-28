// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachTeam} = props
  const {name, id, teamImageUrl} = eachTeam
  return (
    <div>
      <Link to={`/team-matches/${id}`}>
        <li>
          <img
            src={teamImageUrl}
            alt={name}
            height="100px"
            width="200px"
            className="m-2"
          />
          <p>{name}</p>
        </li>
      </Link>
    </div>
  )
}

export default TeamCard
