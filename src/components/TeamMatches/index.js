// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {teamDetails: {}, isLoading: true}

  componentDidMount() {
    this.getTeamDetails()
  }
  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    this.setState({teamDetails: updatedData, isLoading: false})
    console.log('data fetched')
  }

  render() {
    const {teamDetails, isLoading} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = teamDetails
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="teamMatch-bg">
            <img src={teamBannerUrl} alt="team banner" />
            <h1>Latest Matches</h1>
            <div>
              <LatestMatch eachMatch={latestMatch} key={latestMatch.id} />
            </div>
            <div>
              <h1>Recent Matches</h1>
              <ul>
                {recentMatches.map(eachMatch => (
                  <MatchCard eachMatch={eachMatch} key={eachMatch.id} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
