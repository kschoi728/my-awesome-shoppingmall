import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
              MAISON
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              스타일과 품격이 만나는 곳. 2010년부터 현대적인 감각과 클래식한 우아함을 담아온 프리미엄 패션 브랜드입니다.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">바로가기</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  브랜드 소개
                </Link>
              </li>
              <li>
                <Link href="#values" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  브랜드 철학
                </Link>
              </li>
              <li>
                <Link
                  href="#collection"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  컬렉션
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">고객 지원</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  배송 안내
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  반품/교환
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">© 2025 MAISON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
