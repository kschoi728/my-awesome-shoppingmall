import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted relative">
              <Image 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" 
                alt="MAISON 아틀리에" 
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm tracking-widest text-accent uppercase mb-4">About Us</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
              15년간 이어온
              <br />
              장인 정신
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              MAISON은 2010년 서울에서 시작된 프리미엄 패션 브랜드입니다. 우리는 최고급 소재와 섬세한 디테일, 그리고
              현대적인 디자인을 통해 일상에 특별함을 더합니다.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              모든 제품은 숙련된 장인들의 손을 거쳐 탄생하며, 지속 가능한 패션을 추구합니다. 우리의 철학은 단순히 옷을
              만드는 것이 아닌, 당신의 이야기를 담는 것입니다.
            </p>
            <button className="mt-8 inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors group">
              더 알아보기
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
