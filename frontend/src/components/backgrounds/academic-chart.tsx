import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Semestre 1', calculo: 65, algebra: 72 },
  { name: 'Semestre 2', calculo: 75, algebra: 78 },
  { name: 'Semestre 3', calculo: 82, algebra: 85 },
  { name: 'Semestre 4', calculo: 88, algebra: 80 },
  { name: 'Semestre 5', calculo: 92, algebra: 90 },
  { name: 'Semestre 6', calculo: 96, algebra: 95 },
]

export function AcademicChart() {
  return (
    <Card className="w-full max-w-2xl bg-background/50 backdrop-blur-sm border-primary/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Progreso Académico General</CardTitle>
        <CardDescription>Rendimiento histórico en materias de ciencias exactas</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey='name'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: 'var(--primary)' }}
              />
              <Area
                type='monotone'
                dataKey='calculo'
                name='Cálculo Vectorial'
                stroke='currentColor'
                className='text-primary'
                fill='currentColor'
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='algebra'
                name='Álgebra Lineal'
                stroke='currentColor'
                className='text-muted-foreground'
                fill='currentColor'
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
