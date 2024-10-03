export type PawnRecord = {
  pawn_date: Date
  pawn_money: string
  total_days: number
  redemption_date: Date
}

export type PawnItem = {
  id: string
  pawn_money: string
  total_days: number
}

export type Choice = 'single' | 'multiple'
