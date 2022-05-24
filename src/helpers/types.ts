export interface CompanyShortDetails {
  symbol: string
  latestPrice: number
  change: number
  changePercent: number
  ytdChange?: number
}

export interface CompanyInfo {
  CEO: string
  companyName: string
  industry: string
  employees: string
}
