export type ReportStatus =
  | "RECEIVED"
  | "UNDER_REVIEW"
  | "INVESTIGATION"
  | "RESOLVED"
  | "CLOSED";

export interface ReportCategory {
  id: number;
  slug: string;
  name_id: string;
  name_en: string;
}

export interface PublicMetricsOverview {
  totalReports: number;
  openCases: number;
  closedCases: number;
  underInvestigation: number;
}

