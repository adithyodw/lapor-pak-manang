## Deployment & Security Hardening Overview

### Cloudflare WAF

- Front all public endpoints (Vercel frontend and AWS backend load balancer/API Gateway) with Cloudflare.
- Recommended baseline:
  - Enable "Managed WAF Rules" with rulesets for:
    - OWASP Top 10.
    - Bot Fight Mode (standard).
  - Create rate limiting rules:
    - `POST /api/v1/reports`: limit by IP (e.g. 30 req / 5 min).
    - `POST /api/v1/auth/login`: stricter (e.g. 10 req / 5 min).
  - Enforce HTTPS, HSTS, TLS 1.2+.

### AWS – NestJS API

- Run the NestJS API as a container in ECS Fargate (or EKS) with:
  - Service behind an Application Load Balancer (ALB).
  - ALB only accepts traffic from Cloudflare IP ranges (security group / AWS WAF).
- Use RDS PostgreSQL (multi-AZ) and ElastiCache Redis (for future rate-limiting/queues).
- Store evidence files in S3 with:
  - Server-side encryption (SSE-KMS).
  - Bucket policy limited to the API task role.
  - Access only via pre-signed URLs.

### Vercel – Next.js Frontend

- Connect the `web` app to Vercel and:
  - Set `NEXT_PUBLIC_API_BASE_URL` to the Cloudflare-protected backend URL.
  - Enable automatic preview deployments on PRs.
  - Configure environment variables via Vercel UI or `vercel env`.

### Secrets Management

- Use AWS Secrets Manager or SSM Parameter Store for:
  - DB credentials.
  - JWT secrets.
  - SMTP credentials.
  - `OPENAI_API_KEY`.
- Do **not** hard-code secrets in the repo; reference via environment variables in the ECS task definition.

### Encryption & Data Protection

- Ensure:
  - RDS with storage encryption enabled.
  - S3 buckets with SSE-KMS.
  - Cloudflare + ALB using HTTPS.
- Consider column-level or application-level encryption for the most sensitive PII fields if required by policy.

### Monitoring & Logging

- Enable:
  - CloudWatch metrics and logs for ECS tasks, ALB, and RDS.
  - Structured JSON logging from NestJS services.
  - Health check endpoint `/api/v1/health` for ALB.
- Optionally integrate:
  - A log aggregation platform (e.g. Datadog, New Relic, or OpenSearch).

