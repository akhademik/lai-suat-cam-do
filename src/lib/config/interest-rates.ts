export interface InterestRate {
  label: string
  value: number
}

export const INTEREST_RATES: InterestRate[] = [
  { label: '5 %', value: 0.05 },
  { label: '4,5 %', value: 0.045 },
  { label: '4 %', value: 0.04 }
]