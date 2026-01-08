import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Link>

          <div className="mb-12">
            <p className="text-sm tracking-widest text-accent uppercase mb-4">Careers</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight mb-6">
              채용정보
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MAISON과 함께 성장할 인재를 찾고 있습니다.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 md:p-12 mb-8">
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">
                마케팅 디렉터 (Marketing Director)
              </h2>
              <p className="text-muted-foreground">
                MAISON의 브랜드 가치를 전 세계에 알리고, 혁신적인 마케팅 전략을 수립할 리더를 찾습니다.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">주요 업무</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">브랜드 전략 수립 및 실행</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">디지털 마케팅 캠페인 기획 및 운영</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">소셜 미디어 및 콘텐츠 마케팅 전략 수립</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">마케팅 예산 관리 및 성과 분석</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">팀 리더십 및 마케팅 팀 관리</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">자격 요건</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">마케팅 관련 학사 학위 또는 동등한 경력</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">패션/럭셔리 브랜드 마케팅 경력 7년 이상</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">디지털 마케팅 및 소셜 미디어 플랫폼 전문성</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">데이터 분석 및 마케팅 성과 측정 역량</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">팀 관리 및 리더십 경험</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">영어 및 한국어 의사소통 능력 (필수)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">창의적 사고 및 트렌드 분석 능력</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">우대 사항</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">글로벌 브랜드 마케팅 경험</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">인플루언서 마케팅 및 협업 경험</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Adobe Creative Suite 등 디자인 툴 활용 능력</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">CRM 및 마케팅 자동화 도구 경험</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">근무 조건</h3>
                <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">근무지:</span> 서울시 강남구
                  </div>
                  <div>
                    <span className="font-medium text-foreground">근무형태:</span> 정규직 (Full-time)
                  </div>
                  <div>
                    <span className="font-medium text-foreground">급여:</span> 면접 후 결정
                  </div>
                  <div>
                    <span className="font-medium text-foreground">제출서류:</span> 이력서, 자기소개서
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
                지원하기
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                지원 문의: <a href="mailto:careers@maison.com" className="text-accent hover:underline">careers@maison.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

