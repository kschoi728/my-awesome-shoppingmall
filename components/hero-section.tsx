import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-tight text-balance">
            스타일과 품격이
            <br />
            만나는 곳
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            MAISON은 현대적인 감각과 클래식한 우아함을 조화롭게 담아낸 프리미엄 패션 브랜드입니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              컬렉션 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              브랜드 스토리
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg bg-muted">
            <Image 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" 
              alt="MAISON 매장 인테리어" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
