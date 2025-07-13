# EasyWedding API 명세서

## 개요

EasyWedding API는 디지털 청첩장 생성 및 관리 서비스를 위한 RESTful API입니다. 모든 응답은 JSON 형식으로 반환됩니다.

## 기본 정보

- **Base URL**: `https://easywedding.com/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token (필요한 엔드포인트)

## 인증

### JWT 토큰 사용법

```http
Authorization: Bearer <your-jwt-token>
```

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": {
    // 응답 데이터
  },
  "message": "성공 메시지"
}
```

### 에러 응답
```json
{
  "success": false,
  "error": "에러 메시지",
  "code": "ERROR_CODE"
}
```

## 엔드포인트

### 1. 인증 (Authentication)

#### 1.1 회원가입
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "홍길동",
      "isGuest": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "message": "회원가입이 완료되었습니다."
}
```

#### 1.2 로그인
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "홍길동",
      "isGuest": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "message": "로그인이 완료되었습니다."
}
```

### 2. 청첩장 관리 (Invitations)

#### 2.1 청첩장 생성
```http
POST /invitations
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "groomName": "김철수",
  "brideName": "이영희",
  "weddingDate": "2024-06-15",
  "weddingTime": "14:00",
  "venueName": "그랜드 호텔",
  "venueAddress": "서울시 강남구 테헤란로 123",
  "venueMapLink": "https://maps.google.com/...",
  "contactInfo": "010-1234-5678",
  "message": "저희 결혼식에 초대합니다.",
  "photos": [], // File uploads
  "theme": "simple"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invitation": {
      "id": "invitation_id",
      "uuid": "unique-uuid-here",
      "groomName": "김철수",
      "brideName": "이영희",
      "weddingDate": "2024-06-15T00:00:00.000Z",
      "weddingTime": "14:00",
      "venueName": "그랜드 호텔",
      "venueAddress": "서울시 강남구 테헤란로 123",
      "venueMapLink": "https://maps.google.com/...",
      "contactInfo": "010-1234-5678",
      "message": "저희 결혼식에 초대합니다.",
      "photos": ["photo_url_1", "photo_url_2"],
      "theme": "simple",
      "isActive": true,
      "expiresAt": "2024-07-15T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "url": "https://easywedding.com/invite/unique-uuid-here"
  },
  "message": "청첩장이 성공적으로 생성되었습니다."
}
```

#### 2.2 청첩장 조회 (UUID로)
```http
GET /invitations/{uuid}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invitation": {
      "id": "invitation_id",
      "uuid": "unique-uuid-here",
      "groomName": "김철수",
      "brideName": "이영희",
      "weddingDate": "2024-06-15T00:00:00.000Z",
      "weddingTime": "14:00",
      "venueName": "그랜드 호텔",
      "venueAddress": "서울시 강남구 테헤란로 123",
      "venueMapLink": "https://maps.google.com/...",
      "contactInfo": "010-1234-5678",
      "message": "저희 결혼식에 초대합니다.",
      "photos": ["photo_url_1", "photo_url_2"],
      "theme": "simple",
      "isActive": true,
      "expiresAt": "2024-07-15T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 2.3 사용자 청첩장 목록 조회
```http
GET /invitations
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10)
- `status`: 상태 필터 (active, expired, all)

**Response:**
```json
{
  "success": true,
  "data": {
    "invitations": [
      {
        "id": "invitation_id",
        "uuid": "unique-uuid-here",
        "groomName": "김철수",
        "brideName": "이영희",
        "weddingDate": "2024-06-15T00:00:00.000Z",
        "theme": "simple",
        "isActive": true,
        "expiresAt": "2024-07-15T00:00:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### 2.4 청첩장 수정
```http
PUT /invitations/{id}
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "groomName": "김철수",
  "brideName": "이영희",
  "weddingDate": "2024-06-15",
  "weddingTime": "15:00",
  "venueName": "그랜드 호텔",
  "venueAddress": "서울시 강남구 테헤란로 123",
  "message": "수정된 초대 메시지입니다.",
  "theme": "traditional"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invitation": {
      // 업데이트된 청첩장 정보
    }
  },
  "message": "청첩장이 성공적으로 수정되었습니다."
}
```

#### 2.5 청첩장 삭제
```http
DELETE /invitations/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "청첩장이 성공적으로 삭제되었습니다."
}
```

### 3. 파일 업로드 (File Upload)

#### 3.1 사진 업로드
```http
POST /upload/photos
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
photos: [File1, File2, ...]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "photos": [
      "https://s3.amazonaws.com/bucket/photo1.jpg",
      "https://s3.amazonaws.com/bucket/photo2.jpg"
    ]
  },
  "message": "사진이 성공적으로 업로드되었습니다."
}
```

### 4. 결제 (Payments)

#### 4.1 결제 의도 생성
```http
POST /payments/create-intent
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "invitationId": "invitation_id",
  "amount": 2999,
  "currency": "usd"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_client_secret_here",
    "paymentIntentId": "pi_payment_intent_id"
  }
}
```

#### 4.2 결제 확인
```http
POST /payments/confirm
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "paymentIntentId": "pi_payment_intent_id",
  "invitationId": "invitation_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "payment_id",
      "invitationId": "invitation_id",
      "amount": 2999,
      "currency": "usd",
      "status": "completed",
      "stripePaymentIntentId": "pi_payment_intent_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "결제가 성공적으로 완료되었습니다."
}
```

### 5. 템플릿 (Templates)

#### 5.1 템플릿 목록 조회
```http
GET /templates
```

**Response:**
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "template-1",
        "name": "Traditional Invitation",
        "description": "전통적인 스타일의 청첩장",
        "previewImage": "https://example.com/preview1.jpg",
        "theme": "traditional",
        "message": "We are delighted to invite you to celebrate our wedding ceremony..."
      }
    ]
  }
}
```

### 6. 게스트 사용자 (Guest Users)

#### 6.1 게스트 청첩장 생성
```http
POST /guest/invitations
```

**Request Body:**
```json
{
  "email": "guest@example.com",
  "name": "게스트 사용자",
  "invitationData": {
    "groomName": "김철수",
    "brideName": "이영희",
    "weddingDate": "2024-06-15",
    "weddingTime": "14:00",
    "venueName": "그랜드 호텔",
    "venueAddress": "서울시 강남구 테헤란로 123",
    "message": "저희 결혼식에 초대합니다.",
    "photos": [],
    "theme": "simple"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invitation": {
      // 청첩장 정보
    },
    "editToken": "edit_token_here",
    "url": "https://easywedding.com/invite/unique-uuid-here"
  },
  "message": "게스트 청첩장이 성공적으로 생성되었습니다."
}
```

#### 6.2 게스트 청첩장 수정
```http
PUT /guest/invitations/{uuid}
```

**Request Body:**
```json
{
  "editToken": "edit_token_here",
  "invitationData": {
    "groomName": "수정된 이름",
    "message": "수정된 메시지"
  }
}
```

### 7. 관리자 (Admin)

#### 7.1 통계 조회
```http
GET /admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalInvitations": 1250,
    "activeInvitations": 890,
    "totalUsers": 450,
    "totalRevenue": 37500,
    "monthlyStats": {
      "invitations": 120,
      "users": 45,
      "revenue": 3600
    }
  }
}
```

#### 7.2 청첩장 목록 조회 (관리자)
```http
GET /admin/invitations
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수
- `status`: 상태 필터
- `dateFrom`: 시작 날짜
- `dateTo`: 종료 날짜

## 에러 코드

| 코드 | 설명 |
|------|------|
| `VALIDATION_ERROR` | 입력 데이터 검증 실패 |
| `AUTHENTICATION_ERROR` | 인증 실패 |
| `AUTHORIZATION_ERROR` | 권한 부족 |
| `NOT_FOUND` | 리소스를 찾을 수 없음 |
| `PAYMENT_ERROR` | 결제 처리 오류 |
| `FILE_UPLOAD_ERROR` | 파일 업로드 오류 |
| `RATE_LIMIT_EXCEEDED` | 요청 한도 초과 |
| `INTERNAL_SERVER_ERROR` | 서버 내부 오류 |

## 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성됨 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 찾을 수 없음 |
| 422 | 검증 실패 |
| 429 | 요청 한도 초과 |
| 500 | 서버 오류 |

## 제한사항

### Rate Limiting
- 일반 사용자: 100 requests/hour
- 인증된 사용자: 1000 requests/hour
- 관리자: 5000 requests/hour

### 파일 업로드
- 최대 파일 크기: 5MB
- 지원 형식: JPG, PNG, WebP
- 최대 파일 수: 5개

### 청첩장
- 최대 활성 청첩장: 10개 (사용자당)
- 유효기간: 30일 (기본값)
- 최대 메시지 길이: 500자

## 웹훅 (Webhooks)

### 결제 완료 웹훅
```http
POST /webhooks/stripe
```

**Headers:**
```
Stripe-Signature: t=timestamp,v1=signature
```

**Body:**
```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_payment_intent_id",
      "amount": 2999,
      "currency": "usd",
      "metadata": {
        "invitationId": "invitation_id"
      }
    }
  }
}
```

## SDK 및 라이브러리

### JavaScript/TypeScript
```bash
npm install easywedding-sdk
```

```javascript
import { EasyWeddingAPI } from 'easywedding-sdk';

const api = new EasyWeddingAPI({
  baseURL: 'https://easywedding.com/api',
  token: 'your-jwt-token'
});

// 청첩장 생성
const invitation = await api.invitations.create({
  groomName: '김철수',
  brideName: '이영희',
  // ... 기타 데이터
});
```

## 지원 및 문의

- **API 문서**: https://docs.easywedding.com
- **지원 이메일**: api-support@easywedding.com
- **개발자 포럼**: https://community.easywedding.com 