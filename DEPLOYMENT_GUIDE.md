# Vercel 배포 가이드

## 🚀 Vercel 배포 단계

### 1. 사전 준비

1. **GitHub 저장소 준비**
   - 모든 코드가 GitHub에 푸시되어 있어야 함
   - main 브랜치가 최신 상태여야 함

2. **Vercel 계정 생성**
   - [Vercel](https://vercel.com)에서 계정 생성
   - GitHub 계정과 연결

### 2. 프로젝트 배포

1. **Vercel 대시보드에서 새 프로젝트 생성**
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 이름 설정 (예: `easywedding`)

2. **프레임워크 설정**
   - Framework Preset: `Next.js` 자동 감지
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 감지)
   - Output Directory: `.next` (자동 감지)

3. **환경 변수 설정**
   Vercel 대시보드의 "Environment Variables" 섹션에서 다음 변수들을 추가:

   ```env
   # 필수 환경 변수
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/easywedding
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Stripe (결제 테스트용)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   
   # 앱 설정
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   
   # 선택사항 (S3 사용시)
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=ap-southeast-1
   AWS_S3_BUCKET=your-s3-bucket-name
   ```

4. **배포 실행**
   - "Deploy" 버튼 클릭
   - 빌드 과정 모니터링

### 3. 환경 변수 설정 상세

#### MongoDB Atlas 설정
1. [MongoDB Atlas](https://www.mongodb.com/atlas)에서 클러스터 생성
2. 데이터베이스 사용자 생성
3. 네트워크 액세스 설정 (0.0.0.0/0)
4. 연결 문자열 복사하여 `MONGODB_URI`에 설정

#### Stripe 설정
1. [Stripe](https://stripe.com)에서 계정 생성
2. 대시보드에서 API 키 확인
3. 테스트 키를 환경 변수에 설정

### 4. 배포 후 확인

1. **도메인 확인**
   - Vercel에서 제공하는 도메인으로 접속
   - 예: `https://easywedding.vercel.app`

2. **기능 테스트**
   - 홈페이지 로딩 확인
   - 템플릿 선택 페이지 확인
   - 청첩장 생성 플로우 테스트

### 5. 커스텀 도메인 설정 (선택사항)

1. **도메인 구매**
   - 원하는 도메인 구매 (예: `easywedding.com`)

2. **DNS 설정**
   - 도메인 제공업체에서 DNS 레코드 설정
   - Vercel에서 제공하는 네임서버로 변경

3. **Vercel에서 도메인 추가**
   - 프로젝트 설정 → Domains
   - 커스텀 도메인 추가

### 6. 문제 해결

#### 빌드 실패 시
1. **로그 확인**
   - Vercel 대시보드에서 빌드 로그 확인
   - 오류 메시지 분석

2. **일반적인 문제들**
   - 환경 변수 누락
   - 의존성 설치 실패
   - TypeScript 오류

3. **해결 방법**
   ```bash
   # 로컬에서 빌드 테스트
   npm run build
   
   # 의존성 재설치
   rm -rf node_modules package-lock.json
   npm install
   ```

#### 런타임 오류 시
1. **함수 로그 확인**
   - Vercel 대시보드 → Functions
   - API 라우트 오류 확인

2. **환경 변수 재확인**
   - 모든 필수 환경 변수가 설정되어 있는지 확인
   - 값이 올바른지 확인

### 7. 성능 최적화

1. **이미지 최적화**
   - Next.js Image 컴포넌트 사용
   - 적절한 이미지 크기 설정

2. **번들 크기 최적화**
   - 불필요한 의존성 제거
   - 동적 임포트 사용

3. **캐싱 설정**
   - 정적 자산 캐싱
   - API 응답 캐싱

### 8. 모니터링

1. **Vercel Analytics**
   - 페이지뷰 추적
   - 성능 모니터링

2. **오류 추적**
   - 함수 오류 모니터링
   - 사용자 피드백 수집

### 9. 자동 배포 설정

1. **GitHub 연동**
   - main 브랜치에 푸시 시 자동 배포
   - Pull Request 미리보기 배포

2. **배포 알림**
   - Slack/Discord 연동
   - 이메일 알림 설정

---

## 🎉 배포 완료!

배포가 성공적으로 완료되면 다음과 같은 URL로 접속할 수 있습니다:
- **프로덕션**: `https://your-project.vercel.app`
- **개발**: `https://your-project-git-main-your-username.vercel.app`

모든 기능이 정상적으로 작동하는지 확인하고, 필요시 추가 설정을 진행하세요! 