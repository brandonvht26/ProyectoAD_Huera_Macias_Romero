import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = Array.from({ length: 200 }, (_, i) => {
  // Creating a smooth wave over a 4PI range (2 full cycles)
  const x = (i / 200) * Math.PI * 4
  return {
    name: i,
    sin: Math.sin(x),
    // Shifted and scaled slightly differently for a nice overlapping wave effect
    cos: Math.cos(x - Math.PI / 4) * 0.8,
  }
})

export function MathWavesBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-80 mix-blend-screen dark:mix-blend-lighten">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          {/* Hidden axes to allow the chart to render properly but without any labels */}
          <XAxis dataKey="name" hide />
          <YAxis domain={[-1.5, 1.5]} hide />
          
          <Area
            type="monotone"
            dataKey="sin"
            stroke="var(--primary)"
            strokeWidth={3}
            fill="var(--primary)"
            fillOpacity={0.15}
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="cos"
            stroke="var(--secondary)"
            strokeWidth={2}
            fill="var(--secondary)"
            fillOpacity={0.1}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
