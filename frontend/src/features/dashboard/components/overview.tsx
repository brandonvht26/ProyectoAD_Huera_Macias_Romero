import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Oct',
    total: 8.5,
  },
  {
    name: 'Nov',
    total: 9.0,
  },
  {
    name: 'Dic',
    total: 8.2,
  },
  {
    name: 'Ene',
    total: 8.8,
  },
  {
    name: 'Feb',
    total: 9.5,
  },
  {
    name: 'Mar',
    total: 9.1,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          direction='ltr'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 10]}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
