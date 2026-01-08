import { Sparkles, Leaf, Heart } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Sparkles,
      title: "품질",
      description: "최고급 소재만을 엄선하여 오래도록 함께할 수 있는 제품을 만듭니다.",
    },
    {
      icon: Leaf,
      title: "지속 가능성",
      description: "환경을 생각하는 지속 가능한 생산 방식과 소재를 사용합니다.",
    },
    {
      icon: Heart,
      title: "장인 정신",
      description: "숙련된 장인들이 한 땀 한 땀 정성을 담아 제작합니다.",
    },
  ]

  return (
    <section id="values" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-widest text-accent uppercase mb-4">Our Values</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">브랜드 철학</h2>
          <p className="mt-4 text-muted-foreground">MAISON이 추구하는 핵심 가치입니다</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 border border-border rounded-lg bg-background hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <value.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
