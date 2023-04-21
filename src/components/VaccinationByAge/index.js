import {ResponsiveContainer, Pie, Cell, PieChart, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  console.log(vaccinationByAge)

  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination by Age</h1>
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius={0}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#5a8dee" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
