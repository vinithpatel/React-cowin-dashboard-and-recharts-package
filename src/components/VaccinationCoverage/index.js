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
  console.log(last7DaysVaccination)

  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination Coverage</h1>
      <ResponsiveContainer height={500} width="100%">
        <BarChart data={last7DaysVaccination} width={1000} height={300}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis tick={{stroke: 'gray', strokeWidth: 0}} dataForma />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
