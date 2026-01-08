# 404 NOT_FOUND 에러 심화 분석 가이드

## 📋 목차
1. [즉시 해결 방법](#1-즉시-해결-방법)
2. [근본 원인 분석](#2-근본-원인-분석)
3. [개념 이해](#3-개념-이해)
4. [경고 신호 및 예방](#4-경고-신호-및-예방)
5. [대안 및 트레이드오프](#5-대안-및-트레이드오프)

---

## 1. 즉시 해결 방법

### ✅ 이미 적용된 수정 사항

#### 1.1 `vercel.json` 최적화

**이전 (문제 있는 코드):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",  // ❌ 문제의 핵심
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

**수정 후 (올바른 코드):**
```json
{
  "framework": "nextjs"  // ✅ 최소한의 설정
}
```

**왜 이렇게 수정했나?**
- Next.js는 Vercel이 자동으로 감지하고 최적화합니다
- `outputDirectory`를 명시하면 Vercel이 잘못된 디렉토리를 찾으려 합니다
- `.next`는 빌드 캐시이지 서빙 가능한 출력물이 아닙니다

#### 1.2 `app/not-found.tsx` 추가

**생성한 파일:**
```typescript
// app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* 사용자 친화적인 404 페이지 */}
    </div>
  )
}
```

**이 파일의 역할:**
- 존재하지 않는 라우트 접근 시 표시
- 기본 Next.js 404 페이지 대신 커스텀 페이지 제공
- 사용자 경험 개선

### 🔧 배포 전 확인 사항

```bash
# 1. 로컬 빌드 테스트
npm run build
npm start

# 2. 모든 라우트 확인
# - http://localhost:3000/ (메인)
# - http://localhost:3000/careers (채용정보)
# - http://localhost:3000/nonexistent (404 페이지)

# 3. Git 커밋 및 푸시
git add .
git commit -m "Fix 404: Optimize Vercel config"
git push

# 4. Vercel 자동 재배포 대기 또는 수동 재배포
```

---

## 2. 근본 원인 분석

### 2.1 무엇이 잘못되었나?

#### 문제의 핵심: `outputDirectory: ".next"` 설정

**실제로 일어난 일:**

```
1. Vercel이 vercel.json을 읽음
   ↓
2. "outputDirectory": ".next" 발견
   ↓
3. Vercel이 .next 폴더를 서빙 가능한 정적 파일로 간주
   ↓
4. .next 폴더 구조:
   .next/
   ├── cache/          (빌드 캐시)
   ├── server/         (서버 사이드 코드)
   ├── static/         (정적 파일, 하지만 직접 서빙 불가)
   └── BUILD_ID        (빌드 메타데이터)
   ↓
5. Vercel이 .next/static/chunks/app/page.js 같은 파일을 찾으려 시도
   ↓
6. 하지만 실제 서빙 가능한 파일은 다른 곳에 있음
   ↓
7. 404 NOT_FOUND 에러 발생
```

**해야 했던 일:**

```
1. vercel.json에 framework만 지정
   ↓
2. Vercel이 package.json에서 Next.js 감지
   ↓
3. Vercel이 자동으로:
   - 올바른 빌드 명령 실행
   - 올바른 출력 디렉토리 사용
   - Next.js 최적화 설정 적용
   ↓
4. 성공적인 배포
```

### 2.2 왜 이 에러가 발생했나?

#### 조건 1: 잘못된 설정 파일

**트리거 조건:**
- `vercel.json`에 `outputDirectory`가 명시됨
- 값이 `.next`로 설정됨
- Next.js 프로젝트임

**오해의 근원:**
```javascript
// 개발자가 생각한 것:
"outputDirectory는 빌드 결과물이 저장되는 곳이겠지?"

// 실제:
"outputDirectory는 정적 파일 서버의 루트 디렉토리"
```

#### 조건 2: Next.js 빌드 프로세스 오해

**개발자의 오해:**
```
빌드 → .next 폴더 생성 → .next를 서빙
```

**실제 프로세스:**
```
빌드 → .next 폴더 생성 (중간 파일)
  ↓
Vercel이 .next를 분석
  ↓
서빙 가능한 형태로 변환
  ↓
별도의 서빙 디렉토리에 배치
  ↓
배포
```

### 2.3 어떤 오해가 있었나?

#### 오해 1: "outputDirectory는 빌드 출력물"

**실제 의미:**
- `outputDirectory`는 **정적 파일 서버의 루트**입니다
- Next.js는 정적 사이트가 아닙니다 (기본적으로)
- Next.js는 서버 사이드 렌더링을 사용합니다

**올바른 이해:**
```typescript
// 정적 사이트 (예: Gatsby, Next.js static export)
{
  "outputDirectory": "out"  // ✅ 정적 파일들이 여기 있음
}

// Next.js (서버 사이드 렌더링)
{
  "framework": "nextjs"  // ✅ Vercel이 자동 처리
}
```

#### 오해 2: "설정이 많을수록 좋다"

**실제:**
- Vercel은 Next.js를 완벽히 이해합니다
- 불필요한 설정은 오히려 방해가 됩니다
- 기본값이 최적화되어 있습니다

**비유:**
```
과도한 설정 = GPS에 수동으로 모든 경로 입력
자동 감지 = GPS가 자동으로 최적 경로 찾기
```

---

## 3. 개념 이해

### 3.1 왜 이 에러가 존재하나?

#### 보호 메커니즘으로서의 404

**1. 보안 보호**
```typescript
// 나쁜 예: 모든 파일 노출
// 사용자가 .next/server/app-router.js 접근 시도
// → 내부 코드 노출 위험

// 좋은 예: 404로 차단
// 사용자가 존재하지 않는 리소스 접근
// → 404 에러로 안전하게 차단
```

**2. 명확한 피드백**
```typescript
// 나쁜 예: 빈 페이지 또는 에러 없음
// → 사용자가 무엇이 잘못되었는지 모름

// 좋은 예: 명확한 404 페이지
// → "페이지를 찾을 수 없습니다" 메시지
// → 홈으로 돌아가기 버튼
```

**3. 프레임워크 무결성**
```typescript
// Next.js의 라우팅 규칙 보장
// - app/page.tsx → / 라우트
// - app/careers/page.tsx → /careers 라우트
// - 존재하지 않는 라우트 → 404

// 잘못된 설정으로 인한 우회 방지
```

### 3.2 올바른 정신 모델

#### Next.js App Router의 라우팅 시스템

**파일 기반 라우팅:**
```
app/
├── page.tsx              → / (루트)
├── layout.tsx            → 모든 페이지의 레이아웃
├── not-found.tsx         → 404 페이지
├── loading.tsx           → 로딩 상태
├── error.tsx             → 에러 페이지
└── careers/
    ├── page.tsx          → /careers
    └── layout.tsx        → /careers의 레이아웃
```

**라우팅 규칙:**
1. `page.tsx` = 라우트 생성
2. `layout.tsx` = 레이아웃 (중첩 가능)
3. `not-found.tsx` = 404 페이지
4. 폴더명 = URL 경로

**예시:**
```typescript
// app/page.tsx
export default function Home() {
  return <div>홈</div>
}
// → http://localhost:3000/

// app/careers/page.tsx
export default function Careers() {
  return <div>채용정보</div>
}
// → http://localhost:3000/careers

// app/blog/[slug]/page.tsx
export default function BlogPost({ params }) {
  return <div>{params.slug}</div>
}
// → http://localhost:3000/blog/hello-world
```

#### Vercel의 배포 프로세스

**자동 감지 시스템:**
```typescript
// Vercel의 감지 프로세스
1. package.json 읽기
   ↓
2. "next" 의존성 발견
   ↓
3. Next.js 프레임워크로 인식
   ↓
4. 자동 설정 적용:
   - 빌드 명령: "next build"
   - Node.js 런타임
   - 서버 사이드 렌더링 지원
   - 이미지 최적화
   - 자동 스케일링
   ↓
5. 배포
```

**빌드 프로세스:**
```typescript
// 1. 빌드 단계
npm run build
  ↓
.next/ 폴더 생성
  ├── server/        (서버 사이드 코드)
  ├── static/        (정적 자산)
  └── cache/         (빌드 캐시)
  ↓

// 2. Vercel 최적화 단계
Vercel이 .next 분석
  ↓
서빙 가능한 형태로 변환
  ├── Edge Functions (경계 함수)
  ├── Serverless Functions (서버리스 함수)
  └── Static Assets (정적 자산)
  ↓

// 3. 배포 단계
글로벌 CDN에 배포
  ↓
자동 HTTPS
  ↓
완료
```

### 3.3 프레임워크 설계 철학

#### Next.js의 설계 원칙

**1. 관습 우선 (Convention over Configuration)**
```typescript
// 나쁜 예: 모든 것을 명시
{
  "routes": [
    { "path": "/", "file": "app/page.tsx" },
    { "path": "/careers", "file": "app/careers/page.tsx" }
  ]
}

// 좋은 예: 관습 따르기
// app/page.tsx → 자동으로 / 라우트
// app/careers/page.tsx → 자동으로 /careers 라우트
```

**2. 파일 시스템 = 라우팅**
```typescript
// 직관적이고 예측 가능
// 파일 구조를 보면 라우트 구조를 알 수 있음
```

**3. 점진적 채택**
```typescript
// 필요한 것만 사용
// - 기본: page.tsx만으로도 작동
// - 고급: layout, loading, error 등 추가
```

#### Vercel의 설계 원칙

**1. Zero Configuration**
```typescript
// 가능한 한 설정 없이 작동
// 프레임워크를 감지하면 자동으로 최적화
```

**2. 개발자 경험 우선**
```typescript
// 복잡한 설정 대신 간단한 배포
// Git 푸시만으로 배포 완료
```

**3. 성능 최적화**
```typescript
// 자동으로:
// - 이미지 최적화
// - 코드 스플리팅
// - Edge Functions
// - CDN 배포
```

---

## 4. 경고 신호 및 예방

### 4.1 이 문제를 다시 일으킬 수 있는 패턴

#### 패턴 1: 다른 프레임워크 설정 복사

**위험한 시나리오:**
```json
// React 앱의 vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}

// ❌ Next.js에 그대로 복사
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"  // Next.js는 build 폴더를 사용하지 않음!
}
```

**올바른 접근:**
```json
// Next.js는 자동 감지
{
  "framework": "nextjs"
}
// 또는 vercel.json 없음 (가장 좋음)
```

#### 패턴 2: 문서의 예시를 그대로 사용

**위험한 시나리오:**
```json
// Vercel 문서의 일반적인 예시
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}

// ❌ Next.js에 적용
// → Next.js는 dist 폴더를 사용하지 않음
```

**올바른 접근:**
```typescript
// Next.js 전용 문서 확인
// https://vercel.com/docs/frameworks/nextjs
```

#### 패턴 3: 빌드 출력 디렉토리 오해

**위험한 사고:**
```typescript
// "빌드하면 .next 폴더가 생기니까
//  outputDirectory는 .next겠지?"
```

**올바른 이해:**
```typescript
// .next는 중간 파일 저장소
// 실제 서빙은 Vercel이 자동으로 처리
```

### 4.2 코드 냄새 (Code Smells)

#### 냄새 1: 과도한 설정

**의심스러운 패턴:**
```json
{
  "buildCommand": "npm run build",      // package.json에 이미 있음
  "outputDirectory": ".next",            // Next.js는 자동 처리
  "installCommand": "npm install",       // 기본값
  "framework": "nextjs",
  "rewrites": [...],                     // 대부분 불필요
  "headers": [...]                      // 특수한 경우만 필요
}
```

**건강한 패턴:**
```json
{
  "framework": "nextjs"
}
// 또는 vercel.json 없음
```

#### 냄새 2: 설정 파일 중복

**의심스러운 패턴:**
```json
// vercel.json
{
  "buildCommand": "npm run build"
}

// package.json
{
  "scripts": {
    "build": "next build"  // 중복!
  }
}
```

**건강한 패턴:**
```json
// vercel.json - framework만 지정
{
  "framework": "nextjs"
}

// package.json - 빌드 스크립트 정의
{
  "scripts": {
    "build": "next build"
  }
}
```

#### 냄새 3: 하드코딩된 경로

**의심스러운 패턴:**
```json
{
  "outputDirectory": ".next",
  "buildCommand": "next build .next"  // 하드코딩
}
```

**건강한 패턴:**
```json
{
  "framework": "nextjs"  // 자동으로 처리
}
```

### 4.3 예방 체크리스트

#### 배포 전 확인

```typescript
// ✅ 체크리스트
- [ ] vercel.json이 정말 필요한가?
- [ ] Next.js 프로젝트라면 framework만 지정했는가?
- [ ] outputDirectory를 지정하지 않았는가?
- [ ] 로컬에서 npm run build가 성공하는가?
- [ ] 로컬에서 npm start로 테스트했는가?
- [ ] 모든 라우트가 올바르게 작동하는가?
```

#### 개발 중 확인

```typescript
// ✅ 개발 중 체크리스트
- [ ] app/not-found.tsx가 있는가?
- [ ] 모든 page.tsx가 올바른 위치에 있는가?
- [ ] import 경로가 올바른가? (@/components/...)
- [ ] 빌드 에러가 없는가?
```

### 4.4 유사한 실수 시나리오

#### 시나리오 1: 정적 내보내기와 혼동

**실수:**
```typescript
// next.config.ts
export default {
  output: 'export'  // 정적 내보내기
}

// vercel.json
{
  "outputDirectory": ".next"  // ❌ 정적 내보내기는 "out" 폴더 사용
}
```

**올바른 방법:**
```typescript
// 정적 내보내기 시
{
  "outputDirectory": "out"  // ✅
}
// 하지만 Vercel은 Next.js 서버 사이드 렌더링을 권장
```

#### 시나리오 2: 커스텀 서버와 혼동

**실수:**
```typescript
// server.js (커스텀 서버)
const express = require('express')
const next = require('next')

// vercel.json
{
  "outputDirectory": ".next"  // ❌ 커스텀 서버는 다른 설정 필요
}
```

**올바른 방법:**
```typescript
// Vercel은 커스텀 서버를 지원하지 않음
// Next.js API Routes 사용 권장
```

---

## 5. 대안 및 트레이드오프

### 5.1 방법 비교

#### 방법 1: 최소 설정 (가장 추천) ⭐

```json
{
  "framework": "nextjs"
}
```

**장점:**
- ✅ Vercel이 모든 것을 자동 처리
- ✅ 최적화된 설정 자동 적용
- ✅ 유지보수 용이
- ✅ 실수할 가능성 최소
- ✅ Next.js 업데이트 시 자동 대응

**단점:**
- ❌ 매우 특수한 커스텀 빌드 프로세스 제한
- ❌ 환경 변수 등 추가 설정은 대시보드에서 해야 함

**사용 시기:**
- 대부분의 Next.js 프로젝트
- 표준 빌드 프로세스 사용
- 빠른 배포가 목적

#### 방법 2: vercel.json 없음

```json
// vercel.json 파일 자체가 없음
```

**장점:**
- ✅ 가장 단순
- ✅ Vercel 완전 자동 감지
- ✅ 설정 파일 관리 불필요

**단점:**
- ❌ 환경 변수 등 추가 설정 어려움
- ❌ 프로젝트별 설정 문서화 어려움

**사용 시기:**
- 매우 간단한 프로젝트
- 환경 변수가 필요 없음
- 팀 내 표준 설정 사용

#### 방법 3: 명시적 빌드 명령

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

**장점:**
- ✅ 빌드 명령 명확히 지정
- ✅ 특수한 빌드 프로세스 가능
- ✅ 문서화 용이

**단점:**
- ❌ 자동 최적화 일부 제한 가능
- ❌ 설정 오류 가능성
- ❌ package.json과 중복

**사용 시기:**
- 커스텀 빌드 스크립트 사용
- 빌드 프로세스 문서화 필요
- 팀 표준화 필요

#### 방법 4: 환경 변수 포함

```json
{
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com"
  }
}
```

**장점:**
- ✅ 환경 변수를 코드로 관리
- ✅ 버전 관리 가능
- ✅ 팀 공유 용이

**단점:**
- ❌ 민감한 정보 노출 위험 (Git에 커밋)
- ❌ 환경별 설정 복잡

**사용 시기:**
- 공개 가능한 환경 변수만
- 팀 내 공유 필요
- **주의**: 비밀키는 Vercel 대시보드에서만 설정!

### 5.2 트레이드오프 분석

#### 자동화 vs 제어

```typescript
// 자동화 (방법 1, 2)
장점: 빠르고 안전
단점: 세밀한 제어 제한

// 제어 (방법 3, 4)
장점: 세밀한 설정 가능
단점: 실수 가능성, 유지보수 부담
```

#### 단순함 vs 명시성

```typescript
// 단순함 (vercel.json 없음)
장점: 설정 파일 없음
단점: 설정이 코드에 없음

// 명시성 (vercel.json 있음)
장점: 설정이 코드에 명시됨
단점: 추가 파일 관리
```

### 5.3 권장 사항

#### 일반적인 Next.js 프로젝트

**추천: 방법 1 (최소 설정)**
```json
{
  "framework": "nextjs"
}
```

**이유:**
- Next.js는 Vercel이 만든 프레임워크
- 자동 감지가 가장 안전하고 최적화됨
- 대부분의 경우 충분함

#### 특수한 요구사항이 있는 경우

**예시 1: 커스텀 빌드**
```json
{
  "buildCommand": "npm run build:custom",
  "framework": "nextjs"
}
```

**예시 2: 리다이렉트 필요**
```json
{
  "framework": "nextjs",
  "redirects": [
    {
      "source": "/old",
      "destination": "/new",
      "permanent": true
    }
  ]
}
```

### 5.4 마이그레이션 가이드

#### 기존 프로젝트 수정

**1단계: 현재 설정 확인**
```bash
# vercel.json 확인
cat vercel.json
```

**2단계: 불필요한 설정 제거**
```json
// 이전
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}

// 수정 후
{
  "framework": "nextjs"
}
```

**3단계: 테스트**
```bash
npm run build
npm start
# 모든 라우트 테스트
```

**4단계: 배포**
```bash
git add vercel.json
git commit -m "Optimize Vercel config"
git push
```

---

## 6. 실전 예제

### 6.1 올바른 설정 예제

#### 기본 Next.js 프로젝트
```json
// vercel.json
{
  "framework": "nextjs"
}
```

#### 환경 변수가 있는 프로젝트
```json
// vercel.json
{
  "framework": "nextjs"
}

// 환경 변수는 Vercel 대시보드에서 설정
// 또는 .env.local (로컬 개발용)
```

#### 리다이렉트가 필요한 프로젝트
```json
// vercel.json
{
  "framework": "nextjs",
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 6.2 피해야 할 설정 예제

#### ❌ 나쁜 예 1: outputDirectory 지정
```json
{
  "outputDirectory": ".next"  // ❌
}
```

#### ❌ 나쁜 예 2: 불필요한 빌드 명령
```json
{
  "buildCommand": "npm run build",  // package.json에 이미 있음
  "framework": "nextjs"
}
```

#### ❌ 나쁜 예 3: 정적 사이트 설정 복사
```json
{
  "outputDirectory": "dist",  // Next.js는 dist를 사용하지 않음
  "framework": "nextjs"
}
```

---

## 7. 요약 및 핵심 교훈

### 7.1 핵심 교훈

1. **신뢰하되 검증하라**
   - Vercel의 자동 감지를 신뢰
   - 하지만 로컬 빌드는 항상 테스트

2. **최소한의 설정**
   - 필요한 것만 설정
   - 기본값이 최선인 경우가 많음

3. **프레임워크 이해**
   - Next.js의 빌드 프로세스 이해
   - `.next`는 캐시, 서빙 파일은 별도

4. **에러 메시지 읽기**
   - 404는 "파일을 찾을 수 없음"
   - 설정 문제일 가능성 높음

### 7.2 빠른 참조

```bash
# 로컬 빌드 테스트
npm run build
npm start

# Vercel 배포 확인
# 1. Git 푸시
# 2. Vercel 자동 배포
# 3. 배포 로그 확인

# 문제 해결
# 1. vercel.json 확인
# 2. outputDirectory 제거
# 3. framework만 지정
# 4. 재배포
```

### 7.3 추가 리소스

- [Vercel Next.js 문서](https://vercel.com/docs/frameworks/nextjs)
- [Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel 설정 파일](https://vercel.com/docs/projects/project-configuration)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**이제 404 에러를 완전히 이해하고 예방할 수 있습니다!** 🎉

