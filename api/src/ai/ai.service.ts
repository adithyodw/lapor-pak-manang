import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { Report } from '../database/entities/report.entity';
import { AiAnalysis } from '../database/entities/ai-analysis.entity';

export interface AiAnalysisResult {
  classification: {
    categorySlug: string;
    tags: string[];
  };
  scores: {
    riskScore: number;
    urgencyScore: number;
    credibilityScore: number;
  };
  summary: string;
  embedding: number[];
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI | null;
  private readonly model: string;
  private readonly embeddingModel: string;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(AiAnalysis)
    private readonly aiRepo: Repository<AiAnalysis>,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    this.client = apiKey ? new OpenAI({ apiKey }) : null;
    this.model = this.config.get<string>('OPENAI_MODEL', 'gpt-4.1-mini');
    this.embeddingModel = this.config.get<string>(
      'OPENAI_EMBEDDING_MODEL',
      'text-embedding-3-small',
    );
  }

  async analyzeReport(report: Report): Promise<void> {
    if (!this.client) {
      this.logger.warn('OpenAI client not configured; skipping AI analysis');
      return;
    }

    try {
      const prompt = `
You are assisting investigators for the LAPOR PAK MANANG civic reporting platform.
Analyze the following citizen report and respond in strict JSON format.

Report title: ${report.title}
Report description: ${report.description}
Province ID: ${report.provinceId}
City ID: ${report.cityId}

Return JSON with:
- "categorySlug": kebab-case category slug matching internal categories if possible
- "tags": array of short tags
- "riskScore": 0-1 float
- "urgencyScore": 0-1 float
- "credibilityScore": 0-1 float
- "summary": short Indonesian summary (max 3 sentences) for investigators.
`;

      const chat = await this.client.chat.completions.create({
        model: this.model,
        response_format: { type: 'json_schema', json_schema: {
          name: 'ReportAnalysis',
          schema: {
            type: 'object',
            properties: {
              categorySlug: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
              riskScore: { type: 'number' },
              urgencyScore: { type: 'number' },
              credibilityScore: { type: 'number' },
              summary: { type: 'string' },
            },
            required: [
              'categorySlug',
              'tags',
              'riskScore',
              'urgencyScore',
              'credibilityScore',
              'summary',
            ],
            additionalProperties: false,
          },
        }},
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant for a law enforcement civic reporting platform. Always respond in JSON only.',
          },
          { role: 'user', content: prompt },
        ],
      });

      const content = chat.choices[0]?.message?.content ?? '{}';
      const parsed = JSON.parse(content) as Omit<
        AiAnalysisResult,
        'embedding'
      >;

      const embeddingResponse = await this.client.embeddings.create({
        model: this.embeddingModel,
        input: `${report.title}\n\n${report.description}`,
      });
      const embedding = embeddingResponse.data[0]?.embedding ?? [];

      const analysis = this.aiRepo.create({
        reportId: report.id,
        model: this.model,
        classificationRaw: {
          categorySlug: parsed.classification?.categorySlug ?? parsed.categorySlug,
          tags: parsed.classification?.tags ?? parsed.tags ?? [],
        },
        scoresRaw: {
          riskScore: parsed.scores?.riskScore ?? parsed.riskScore,
          urgencyScore: parsed.scores?.urgencyScore ?? parsed.urgencyScore,
          credibilityScore:
            parsed.scores?.credibilityScore ?? parsed.credibilityScore,
        },
        embeddingVector: Buffer.from(new Float32Array(embedding).buffer),
      });

      await this.aiRepo.save(analysis);

      await this.reportRepo.update(report.id, {
        riskScore: parsed.scores?.riskScore ?? parsed.riskScore,
        urgencyScore: parsed.scores?.urgencyScore ?? parsed.urgencyScore,
        credibilityScore:
          parsed.scores?.credibilityScore ?? parsed.credibilityScore,
        aiSummary: parsed.summary,
      });
    } catch (err) {
      this.logger.error('Failed to analyze report with OpenAI', err as Error);
    }
  }
}

