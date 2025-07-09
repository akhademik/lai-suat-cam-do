export type TheAsset = {
  pawn_date: Date;
  pawn_money: string;
  total_days: number;
  redemption_date: Date;
};

export type TheAssetItem = {
  id: string;
  pawn_money: string;
  total_days: number;
};


// Base money type to handle string amounts with commas
export interface MoneyAmount {
  raw: string          // Original string with commas (e.g., "1,000,000")
  value: number        // Numeric value (e.g., 1000000)
}

// Base date range interface
export interface DateRange {
  startDate: Date
  endDate: Date
  totalDays: number
}

// Base asset interface
export interface BaseAsset {
  id: string
  amount: MoneyAmount
  dateRange: DateRange
}

// Interest calculation result
export interface InterestResult {
  principal: MoneyAmount
  rate: number
  interest: MoneyAmount
  total: MoneyAmount
}

// Single asset with interest calculations
export interface Asset extends BaseAsset {
  calculations: InterestResult[]
}

// Multiple assets group
export interface AssetGroup {
  assets: Asset[]
  summary: {
    totalPrincipal: MoneyAmount
    calculations: InterestResult[]
  }
}