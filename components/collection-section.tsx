import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function CollectionSection() {
  const collections = [
    {
      title: "Spring Collection",
      description: "봄의 싱그러움을 담은 컬렉션",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    },
    {
      title: "Essentials",
      description: "일상의 기본이 되는 아이템",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    },
    {
      title: "Premium Line",
      description: "특별한 순간을 위한 프리미엄 라인",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    },
  ]

  return (
    <section id="collection" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm tracking-widest text-accent uppercase mb-4">Collections</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground">최신 컬렉션</h2>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors group">
            전체 보기
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[2/3] overflow-hidden rounded-lg mb-4 bg-muted relative">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                {collection.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
