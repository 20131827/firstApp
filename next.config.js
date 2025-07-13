/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-s3-bucket.s3.amazonaws.com'],
  },
  // 환경 변수는 .env 파일에서 직접 접근하므로 여기서 정의할 필요 없음
}

module.exports = nextConfig 