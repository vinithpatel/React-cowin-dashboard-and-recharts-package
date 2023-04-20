import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
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
        vaccinaionByAge: data.vaccinaion_by_age,
        vaccinationByGender: data.vaccinaion_by_gender,
      }
      this.setState({apiStatus: apiStatusConstants.success, data: formatData})
    }
  }

  renderLoader = () => (
    <div data-testId="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCharts = () => {
    const {data} = this.state
    const {last7DaysVaccination} = data

    return (
      <div className="charts-container">
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
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
        <p className="logo-para">CoWIN Vaccination in India</p>
        <div className="body-container">{this.renderResources()}</div>
      </div>
    )
  }
}

export default CowinDashboard
