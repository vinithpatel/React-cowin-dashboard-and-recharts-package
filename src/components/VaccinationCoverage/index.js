import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination Coverage</h1>
      <ResponsiveContainer height={500} width="100%">
        <BarChart data={last7DaysVaccination} width={1000} height={300}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            dataKey="vaccinated_people"
            tick={{stroke: 'gray', strokeWidth: 0}}
            tickFormatter={DataFormatter}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="dose 1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="dose 1" fill="#1f77b4" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
