import type { PawnItem, PawnRecord } from '$lib/types/pawn-shop'

export const total_pawn_days = (pawn_date: Date, redemption_date: Date) => {
  const one_day_ms = 24 * 60 * 60 * 1000
  const pawn_date_ms = pawn_date.getTime()
  const redemption_date_ms = redemption_date.getTime()
  const total_days = Math.round(Math.abs(redemption_date_ms - pawn_date_ms) / one_day_ms)

  // add 1 to also include the day of the pawn action
  return total_days + 1
}

export const format_input_money = (input: string) => {
  input = input
    .replace(/\D/g, '') // remove all non-digit
    .replace(/^0+/, '') // remove leading zero
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
  return input
}

export const final_interest = (pawn_money_str: string, days: number, interest_rate: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  const result = (interest_rate / 30) * days * pawn_money
  const rounded_result = Math.round(result / 1000) * 1000
  return rounded_result
}

export const number_to_string = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const final_money = (pawn_money_str: string, interest_rate: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  const result = pawn_money + interest_rate
  return number_to_string(result)
}

export const final_money_no_format = (pawn_money_str: string, interest_rate: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  const result = pawn_money + interest_rate
  return result
}

export const pawn_record_init = () => {
  const first_of_month = new Date()
  first_of_month.setDate(1)

  let pawn_record: PawnRecord = {
    pawn_date: first_of_month,
    pawn_money: '',
    total_days: 0,
    redemption_date: new Date(),
  }

  const saved_pawn_item = sessionStorage.getItem('pawn-item')
  if (saved_pawn_item) {
    pawn_record = JSON.parse(saved_pawn_item)
    pawn_record.pawn_date = new Date(pawn_record.pawn_date)
    pawn_record.redemption_date = new Date(pawn_record.redemption_date)
  }
  return pawn_record
}

export const init_pawn_item_array = () => {
  const saved_array = sessionStorage.getItem('pawn-item-array')
  const pawn_item_array: PawnItem[] = saved_array ? JSON.parse(saved_array) : []
  return pawn_item_array
}
