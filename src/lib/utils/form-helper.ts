import type { TheAssetItem } from '$lib/types/pawn-shop'

const ONE_DAY = 24 * 60 * 60 * 1000

export const total_pawn_days = (pawn_date: Date, redemption_date: Date) => {
  const pawn_date_ms = pawn_date.getTime()
  const redemption_date_ms = redemption_date.getTime()
  const total_days = Math.round(Math.abs(redemption_date_ms - pawn_date_ms) / ONE_DAY)
  return total_days + 1
}

export const format_money_input = (input: string) => {
  input = input
    .replace(/\D/g, '') // remove all non-digit
    .replace(/^0+/, '') // remove leading zero
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // insert ',' every 3 digits for thousand separators
  return input
}

export const final_interest = (pawn_money_str: string, days: number, interest: number = 0.05) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  // const result = Math.round((interest / 30) * days * pawn_money)
  const result = (interest / 30) * days * pawn_money
  const rounded_result = Math.round(result / 1000) * 1000
  return rounded_result
}

export const number_to_string = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const final_money = (pawn_money_str: string, interest: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  const result = pawn_money + interest
  return number_to_string(result)
}

export const final_money_no_format = (pawn_money_str: string, interest: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''))
  const result = pawn_money + interest
  return result
}

export const init_asset = () => {
  const first_of_month = new Date()
  first_of_month.setDate(1)

  let asset = {
    pawn_date: first_of_month,
    pawn_money: '',
    total_days: 0,
    redemption_date: new Date(),
  }

  const save_asset = sessionStorage.getItem('asset')
  if (save_asset) {
    asset = JSON.parse(save_asset)
    asset.pawn_date = new Date(asset.pawn_date)
    asset.redemption_date = new Date(asset.redemption_date)
  }
  return asset
}

export const init_asset_array = () => {
  let asset_array: TheAssetItem[] = []

  const saved_array = sessionStorage.getItem('asset-array')
  if (saved_array) {
    asset_array = JSON.parse(saved_array)
  }
  return asset_array
}
