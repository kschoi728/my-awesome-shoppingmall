"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
            MAISON
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#about"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              브랜드 소개
            </Link>
            <Link
              href="#values"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              브랜드 철학
            </Link>
            <Link
              href="#collection"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              컬렉션
            </Link>
            <Link
              href="#contact"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/careers"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              채용정보
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">쇼핑하기</Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border mt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="#about"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                브랜드 소개
              </Link>
              <Link
                href="#values"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                브랜드 철학
              </Link>
              <Link
                href="#collection"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                컬렉션
              </Link>
              <Link
                href="#contact"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                문의하기
              </Link>
              <Link
                href="/careers"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                채용정보
              </Link>
              <Button className="mt-2 bg-primary text-primary-foreground">쇼핑하기</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
