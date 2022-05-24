export interface CompanyShortDetails {
  symbol: string
  change: number
  changePercent: number
  ytdChange?: number,
  iexRealtimePrice?: number
}

export interface CompanyInfo {
  CEO: string
  companyName: string
  industry: string
  employees: string
}
