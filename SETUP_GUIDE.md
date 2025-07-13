# EasyWedding 프로젝트 설정 가이드

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
cd mblileWedding
npm install
```

### 2. 환경 변수 설정

```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 다음 정보를 입력하세요:

```env
# 필수 설정
MONGODB_URI=mongodb://localhost:27017/easywedding
JWT_SECRET=your-super-secret-jwt-key-here

# Stripe 설정 (결제 테스트용)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# AWS S3 설정 (선택사항)
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=your-s3-bucket-name

# 앱 설정
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📋 필수 서비스 설정

### MongoDB 설정

#### 옵션 1: 로컬 MongoDB
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) 다운로드 및 설치
2. MongoDB 서비스 시작
3. 데이터베이스 생성:
   ```bash
   mongosh
   use easywedding
   ```

#### 옵션 2: MongoDB Atlas (권장)
1. [MongoDB Atlas](https://www.mongodb.com/atlas)에서 계정 생성
2. 새 클러스터 생성 (무료 티어 사용 가능)
3. 데이터베이스 사용자 생성
4. 네트워크 액세스 설정 (0.0.0.0/0으로 모든 IP 허용)
5. 연결 문자열 복사하여 `MONGODB_URI`에 설정

### Stripe 설정

1. [Stripe](https://stripe.com) 계정 생성
2. 대시보드에서 API 키 확인
3. 테스트 키를 환경 변수에 설정
4. 웹훅 설정 (선택사항):
   - 엔드포인트: `https://your-domain.com/api/webhooks/stripe`
   - 이벤트: `payment_intent.succeeded`

### AWS S3 설정 (선택사항)

1. [AWS Console](https://aws.amazon.com)에서 계정 생성
2. S3 버킷 생성
3. IAM 사용자 생성 및 S3 권한 부여
4. 액세스 키와 시크릿 키를 환경 변수에 설정

## 🛠️ 개발 도구 설정

### VS Code 확장 프로그램 (권장)

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### ESLint 및 Prettier 설정

프로젝트에 이미 포함되어 있지만, 필요시 추가 설정:

```bash
npm install -D eslint-config-prettier eslint-plugin-prettier
```

## 📱 모바일 테스트

### Chrome DevTools
1. F12 키를 눌러 개발자 도구 열기
2. 모바일 아이콘 클릭
3. 다양한 기기 해상도로 테스트

### 실제 모바일 기기
1. 로컬 네트워크 IP 확인: `ipconfig` (Windows) 또는 `ifconfig` (Mac/Linux)
2. `.env.local`에서 `NEXT_PUBLIC_BASE_URL`을 로컬 IP로 설정
3. 모바일에서 `http://your-local-ip:3000` 접속

## 🔧 문제 해결

### 일반적인 문제들

#### 1. 포트 충돌
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

#### 2. MongoDB 연결 실패
- MongoDB 서비스가 실행 중인지 확인
- 연결 문자열이 올바른지 확인
- 방화벽 설정 확인

#### 3. Stripe 결제 테스트 실패
- 테스트 카드 번호 사용: `4242 4242 4242 4242`
- 만료일: 미래 날짜
- CVC: 임의의 3자리 숫자

#### 4. 이미지 업로드 실패
- AWS S3 설정 확인
- 파일 크기 제한 확인 (5MB)
- 지원 형식 확인 (JPG, PNG, WebP)

### 로그 확인

```bash
# 개발 서버 로그
npm run dev

# 빌드 로그
npm run build

# 프로덕션 로그
npm run start
```

## 🚀 배포 준비

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 활성화

### 환경 변수 체크리스트

배포 전 다음 환경 변수가 설정되어 있는지 확인:

- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_PUBLISHABLE_KEY`
- [ ] `NEXT_PUBLIC_BASE_URL`
- [ ] `AWS_ACCESS_KEY_ID` (S3 사용시)
- [ ] `AWS_SECRET_ACCESS_KEY` (S3 사용시)
- [ ] `AWS_REGION` (S3 사용시)
- [ ] `AWS_S3_BUCKET` (S3 사용시)

## 📊 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 형식 지원
- 적절한 이미지 크기 설정

### 번들 크기 최적화
- 동적 임포트 사용
- 불필요한 의존성 제거
- Tree shaking 활성화

### 데이터베이스 최적화
- 인덱스 설정
- 쿼리 최적화
- 연결 풀 설정

## 🔒 보안 체크리스트

- [ ] JWT 시크릿 키가 충분히 복잡한지 확인
- [ ] 환경 변수가 `.env.local`에만 저장되어 있는지 확인
- [ ] CORS 설정이 적절한지 확인
- [ ] 입력 데이터 검증이 모든 엔드포인트에 적용되어 있는지 확인
- [ ] HTTPS 사용 (프로덕션)
- [ ] Rate limiting 설정 (필요시)

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. **로그 확인**: 개발자 도구 콘솔 및 서버 로그
2. **문서 참조**: README.md 및 API_SPECIFICATION.md
3. **GitHub Issues**: 버그 리포트 또는 기능 요청
4. **커뮤니티**: 개발자 포럼 또는 Discord

---

**Happy Coding! 🎉** 