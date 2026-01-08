export function StatsSection() {
  const stats = [
    { number: "2010", label: "브랜드 설립" },
    { number: "15+", label: "년의 역사" },
    { number: "50,000+", label: "고객 수" },
    { number: "120+", label: "매장 수" },
  ]

  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-medium text-foreground">{stat.number}</p>
              <p className="mt-2 text-sm text-muted-foreground tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
