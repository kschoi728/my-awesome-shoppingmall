import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium">함께 이야기해요</h2>
        <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
          비즈니스 협력, 매장 입점, 또는 기타 문의사항이 있으시면 언제든지 연락해 주세요.
        </p>
        <Button size="lg" className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8">
          문의하기
        </Button>
      </div>
    </section>
  )
}
