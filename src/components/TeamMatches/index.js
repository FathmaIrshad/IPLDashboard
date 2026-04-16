// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Cell, Tooltip} from 'recharts'
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

  getPieChartData = () => {
    const {teamDetails} = this.state
    const {latestMatch, recentMatches} = teamDetails
    const allMatches = [...recentMatches, latestMatch]
    const won = allMatches.filter(m => m.match_status === 'Won').length
    const lost = allMatches.filter(m => m.match_status === 'Lost').length
    const draw = allMatches.filter(m => m.match_status === 'Draw').length

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Draw', value: draw},
    ]
  }

  render() {
    const {teamDetails, isLoading} = this.state
    const {teamBannerUrl, latestMatch, recentMatches} = teamDetails
    const chartData = isLoading ? [] : this.getPieChartData()
    console.log(chartData)
    return (
      <div>
        {isLoading ? (
          <div>
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

            <Link to="/">
              <button type="button">Back</button>
            </Link>

            <div className="Chart-container">
              <PieChart width={400} height={1000}>
                <Pie
                  data={chartData}
                  cx="50%" // Centers horizontally
                  cy="50%" // Centers vertically
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="value"
                  label
                >
                  <Cell name="Won" fill="#fecba6" />
                  <Cell name="Lost" fill="#b3d23f" />
                  <Cell name="Draw" fill="#a44c9e" />
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: '5px',
                  }}
                />
              </PieChart>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
