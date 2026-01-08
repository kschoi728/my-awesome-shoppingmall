# 배포 가이드

이 문서는 my-awesome-shoppingmall 프로젝트를 무료로 배포하는 방법을 안내합니다.

## 🚀 방법 1: Vercel (가장 추천)

Vercel은 Next.js를 만든 회사에서 제공하는 플랫폼으로, Next.js 프로젝트에 최적화되어 있습니다.

### 장점
- ✅ Next.js에 최적화
- ✅ 자동 HTTPS
- ✅ 글로벌 CDN
- ✅ Git 연동으로 자동 배포
- ✅ 무료 플랜 제공 (개인 프로젝트용)
- ✅ 커스텀 도메인 지원

### 배포 단계

#### 1. GitHub에 프로젝트 업로드

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub에 새 저장소 생성 후
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

#### 2. Vercel에 배포

**방법 A: 웹 인터페이스 사용 (가장 쉬움)**

1. [Vercel](https://vercel.com)에 접속하여 GitHub 계정으로 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: Next.js (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동)
   - Output Directory: `.next` (자동)
5. "Deploy" 클릭
6. 배포 완료 후 제공되는 URL로 접속

**방법 B: Vercel CLI 사용**

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
cd 09/my-awesome-shoppingmall
vercel

# 로그인 후 배포 진행
# - 프로젝트 이름 입력
# - 배포 설정 확인
```

### 환경 변수 설정 (필요한 경우)

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 필요한 환경 변수 추가

---

## 🌐 방법 2: Netlify

Netlify도 Next.js를 잘 지원하는 플랫폼입니다.

### 배포 단계

1. [Netlify](https://www.netlify.com)에 GitHub 계정으로 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. "Deploy site" 클릭

**참고**: Netlify는 Next.js를 정적 사이트로 빌드하므로, 일부 Next.js 기능(서버 사이드 렌더링 등)이 제한될 수 있습니다.

---

## 🚂 방법 3: Railway

Railway는 서버리스와 전통적인 서버 환경을 모두 지원합니다.

### 배포 단계

1. [Railway](https://railway.app)에 GitHub 계정으로 로그인
2. "New Project" → "Deploy from GitHub repo"
3. 저장소 선택
4. 자동으로 빌드 및 배포 시작
5. 제공되는 URL로 접속

---

## 📦 방법 4: Render

Render는 무료 플랜을 제공하는 클라우드 플랫폼입니다.

### 배포 단계

1. [Render](https://render.com)에 GitHub 계정으로 로그인
2. "New +" → "Web Service"
3. GitHub 저장소 연결
4. 설정:
   - Name: 프로젝트 이름
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. "Create Web Service" 클릭

---

## 🔧 배포 전 체크리스트

배포하기 전에 다음 사항을 확인하세요:

- [ ] `package.json`에 빌드 스크립트가 있는지 확인
- [ ] 환경 변수가 필요한 경우 `.env.example` 파일 생성
- [ ] `.gitignore`에 `node_modules`, `.next` 등이 포함되어 있는지 확인
- [ ] 프로덕션 빌드 테스트: `npm run build && npm start`
- [ ] 이미지 최적화 설정 확인 (`next.config.ts`)

---

## 📝 환경 변수 예시

만약 환경 변수가 필요하다면 `.env.local` 파일을 만들고 (Git에 커밋하지 않음):

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Vercel/Netlify 등의 대시보드에서도 동일하게 설정할 수 있습니다.

---

## 🎯 추천 배포 플랫폼 비교

| 플랫폼 | Next.js 지원 | 무료 플랜 | 자동 배포 | 커스텀 도메인 |
|--------|-------------|----------|----------|--------------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Netlify | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Railway | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Render | ⭐⭐⭐ | ✅ | ✅ | ✅ |

**결론**: Next.js 프로젝트는 **Vercel**을 가장 추천합니다!

---

## 🆘 문제 해결

### 빌드 오류가 발생하는 경우

1. 로컬에서 빌드 테스트:
   ```bash
   npm run build
   ```

2. 빌드 로그 확인:
   - Vercel/Netlify 대시보드에서 빌드 로그 확인
   - 오류 메시지 확인 후 수정

### 이미지가 표시되지 않는 경우

- `next.config.ts`에서 이미지 도메인 설정 확인
- Unsplash 이미지 URL이 올바른지 확인

### 환경 변수 오류

- 대시보드에서 환경 변수 설정 확인
- 변수명이 `NEXT_PUBLIC_`로 시작하는지 확인 (클라이언트에서 사용하는 경우)

---

## 📚 추가 자료

- [Vercel 배포 가이드](https://vercel.com/docs)
- [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)
- [Netlify Next.js 가이드](https://docs.netlify.com/integrations/frameworks/next-js/)

