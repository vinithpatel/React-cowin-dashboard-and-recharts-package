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
    console.log(number)
    return number
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
            tick={{stroke: 'gray', strokeWidth: 0}}
            tickFormatter={DataFormatter}
            height={6000}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="dose 1" fill="#5a8dee" />
          <Bar dataKey="dose2" name="dose 2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
