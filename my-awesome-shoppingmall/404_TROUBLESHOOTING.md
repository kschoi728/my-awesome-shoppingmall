# 404 NOT_FOUND 에러 해결 가이드

## 1. 문제 해결 방법

### ✅ 수정 사항

1. **`vercel.json` 설정 수정**
   - 불필요한 `outputDirectory` 설정 제거
   - Next.js는 자동으로 빌드 출력을 처리합니다

2. **`app/not-found.tsx` 파일 추가**
   - 커스텀 404 페이지 생성
   - 존재하지 않는 라우트에 대한 사용자 친화적 에러 페이지

### 🔧 즉시 적용 가능한 해결책

```bash
# 1. 변경사항 커밋 및 푸시
git add .
git commit -m "Fix 404 error: Update Vercel config and add not-found page"
git push

# 2. Vercel에서 재배포
# Vercel 대시보드 → 프로젝트 → Deployments → 최신 배포의 "Redeploy"
```

---

## 2. 근본 원인 분석

### ❌ 문제가 된 코드

**`vercel.json` (이전 버전):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",  // ❌ 문제의 원인
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### ✅ 올바른 코드

**`vercel.json` (수정 후):**
```json
{
  "framework": "nextjs"  // ✅ Next.js가 자동으로 처리
}
```

### 🔍 무엇이 잘못되었나?

1. **`outputDirectory: ".next"` 설정의 문제**
   - `.next` 폴더는 Next.js의 **빌드 캐시 및 중간 파일** 저장소입니다
   - 이것은 **최종 배포 가능한 출력물이 아닙니다**
   - Vercel이 `.next` 폴더를 찾으려 했지만, 실제 서빙 가능한 파일은 다른 곳에 있었습니다

2. **Next.js의 빌드 프로세스**
   ```
   npm run build
   ↓
   .next/ 폴더 생성 (빌드 캐시, 최적화된 파일)
   ↓
   Vercel이 자동으로 서빙 가능한 형태로 변환
   ↓
   배포
   ```

3. **Vercel의 Next.js 자동 감지**
   - Vercel은 `package.json`에서 Next.js를 감지하면 자동으로:
     - 올바른 빌드 명령 실행
     - 올바른 출력 디렉토리 사용
     - 최적화된 배포 설정 적용

### 💡 왜 이 에러가 발생했나?

**실제로 일어난 일:**
1. Vercel이 `outputDirectory: ".next"`를 읽음
2. `.next` 폴더를 서빙하려고 시도
3. `.next`는 서빙 가능한 정적 파일이 아님
4. 404 NOT_FOUND 에러 발생

**해야 했던 일:**
1. Next.js 프레임워크만 지정
2. Vercel이 자동으로 올바른 빌드 프로세스 실행
3. 서빙 가능한 파일 자동 생성 및 배포

---

## 3. 개념 이해

### 🎯 왜 이 에러가 존재하나?

**404 NOT_FOUND는 보호 메커니즘입니다:**

1. **잘못된 리소스 접근 방지**
   - 존재하지 않는 파일/라우트에 접근 시도 차단
   - 보안상 민감한 내부 파일 노출 방지

2. **명확한 에러 피드백**
   - 개발자에게 문제를 명확히 알림
   - 사용자에게 친화적인 에러 페이지 제공 가능

3. **프레임워크 무결성 보장**
   - Next.js가 올바른 방식으로 배포되도록 보장
   - 잘못된 설정으로 인한 예상치 못한 동작 방지

### 🧠 올바른 정신 모델

**Next.js App Router의 라우팅:**
```
app/
├── page.tsx          → / (루트)
├── layout.tsx        → 모든 페이지의 레이아웃
├── not-found.tsx     → 404 페이지
└── careers/
    └── page.tsx      → /careers
```

**Vercel 배포 프로세스:**
```
1. Git 저장소 감지
2. package.json 분석 → Next.js 감지
3. 자동 빌드 설정 적용
4. npm run build 실행
5. 최적화된 파일 생성
6. 자동 배포
```

**핵심 개념:**
- **신뢰**: Vercel은 Next.js를 완벽히 이해하고 있음
- **자동화**: 명시적 설정보다 자동 감지가 더 안전함
- **최적화**: Vercel이 Next.js에 최적화된 배포 전략 적용

---

## 4. 경고 신호 및 예방

### 🚨 이 문제를 다시 일으킬 수 있는 패턴

1. **과도한 설정**
   ```json
   // ❌ 나쁜 예: 불필요한 설정
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   
   // ✅ 좋은 예: 최소한의 설정
   {
     "framework": "nextjs"
   }
   ```

2. **다른 프레임워크의 설정 복사**
   - React 앱의 설정을 Next.js에 적용
   - 정적 사이트 빌더 설정 사용

3. **빌드 출력 디렉토리 오해**
   - `.next`를 서빙 디렉토리로 착각
   - `out` 폴더와 혼동 (정적 내보내기 시)

### 🔍 코드 냄새 (Code Smells)

**의심스러운 패턴:**
- `vercel.json`에 `outputDirectory`가 명시되어 있음
- `buildCommand`가 `package.json`과 중복됨
- Next.js 프로젝트인데 수동 빌드 설정이 많음

**건강한 패턴:**
- `vercel.json`이 최소한이거나 없음
- `package.json`의 스크립트에 의존
- 프레임워크 자동 감지 활용

### 📋 체크리스트

배포 전 확인:
- [ ] `vercel.json`이 정말 필요한가?
- [ ] Next.js 프로젝트라면 `framework: "nextjs"`만 있으면 됨
- [ ] 로컬에서 `npm run build`가 성공하는가?
- [ ] `.next` 폴더를 직접 서빙하려고 하지 않는가?

---

## 5. 대안 및 트레이드오프

### 방법 1: 최소 설정 (추천) ✅

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

**단점:**
- ❌ 커스텀 빌드 프로세스 제한

### 방법 2: 명시적 설정

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

**장점:**
- ✅ 빌드 명령 명확히 지정
- ✅ 특수한 빌드 프로세스 가능

**단점:**
- ❌ 자동 최적화 일부 제한
- ❌ 설정 오류 가능성

### 방법 3: vercel.json 없음

**장점:**
- ✅ 가장 단순
- ✅ Vercel 완전 자동 감지

**단점:**
- ❌ 환경 변수 등 추가 설정 어려움

### 🎯 권장 사항

**대부분의 경우 방법 1 (최소 설정)을 사용하세요:**
- Next.js는 Vercel이 만든 프레임워크
- 자동 감지가 가장 안전하고 최적화됨
- 필요할 때만 추가 설정

---

## 6. 추가 리소스

### 공식 문서
- [Vercel Next.js 배포](https://vercel.com/docs/frameworks/nextjs)
- [Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel 설정 파일](https://vercel.com/docs/projects/project-configuration)

### 관련 개념
- **Next.js App Router**: 파일 기반 라우팅 시스템
- **Vercel 빌드 프로세스**: 자동 감지 및 최적화
- **정적 생성 vs 서버 사이드 렌더링**: Next.js의 렌더링 전략

---

## 7. 요약

### 핵심 교훈

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

### 빠른 참조

```bash
# 로컬 빌드 테스트
npm run build
npm start

# Vercel 배포 확인
# 1. Git 푸시
# 2. Vercel 자동 배포
# 3. 배포 로그 확인
```

---

**이제 404 에러 없이 배포할 수 있습니다!** 🎉

