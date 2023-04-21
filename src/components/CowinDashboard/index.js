import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAIL',
  inProgress: 'PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    data: {},
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getData()
  }

  getFormatedData = array =>
    array.map(eachObject => ({
      vaccineDate: eachObject.vaccine_date,
      dose1: eachObject.dose_1,
      dose2: eachObject.dose_2,
    }))

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const formatData = {
        last7DaysVaccination: this.getFormatedData(
          data.last_7_days_vaccination,
        ),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({apiStatus: apiStatusConstants.success, data: formatData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-bg-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderCharts = () => {
    const {data} = this.state
    const {last7DaysVaccination, vaccinationByGender, vaccinationByAge} = data
    console.log(vaccinationByAge)

    return (
      <div className="charts-container">
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderResources = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-bg-container">
        <div className="website-logo-card">
          <img
            className="cowin-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="website-heading">Co-WIN</h1>
        </div>
        <h1 className="logo-para">CoWIN Vaccination in India</h1>
        <div className="body-container">{this.renderResources()}</div>
      </div>
    )
  }
}

export default CowinDashboard
