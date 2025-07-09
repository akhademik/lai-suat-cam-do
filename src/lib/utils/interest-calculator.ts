import type { MoneyAmount, InterestResult, Asset, AssetGroup } from '../types/pawn-shop'
import type { InterestRate } from '../config/interest-rates'

// Convert string money to MoneyAmount object
export function parseMoneyAmount(amount: string): MoneyAmount {
  const raw = amount.trim()
  const value = Number(raw.replace(/,/g, ''))
  return { raw, value }
}

// Format number to MoneyAmount
export function formatMoneyAmount(value: number): MoneyAmount {
  const raw = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return { raw, value }
}

// Calculate interest for a single amount
export function calculateInterest(
  principal: MoneyAmount,
  days: number,
  rate: InterestRate
): InterestResult {
  const interest = (principal.value * rate.value * days) / 30
  const roundedInterest = Math.round(interest / 1000) * 1000
  const total = principal.value + roundedInterest

  return {
    principal,
    rate: rate.value,
    interest: formatMoneyAmount(roundedInterest),
    total: formatMoneyAmount(total)
  }
}

// Calculate interest for multiple assets
export function calculateGroupInterest(assets: Asset[], rate: InterestRate): AssetGroup {
  let totalPrincipalValue = 0
  let totalInterestValue = 0

  const calculatedAssets = assets.map(asset => {
    const result = calculateInterest(asset.amount, asset.dateRange.totalDays, rate)
    totalPrincipalValue += asset.amount.value
    totalInterestValue += result.interest.value
    return {
      ...asset,
      calculations: [result]
    }
  })

  return {
    assets: calculatedAssets,
    summary: {
      totalPrincipal: formatMoneyAmount(totalPrincipalValue),
      calculations: [{
        principal: formatMoneyAmount(totalPrincipalValue),
        rate: rate.value,
        interest: formatMoneyAmount(totalInterestValue),
        total: formatMoneyAmount(totalPrincipalValue + totalInterestValue)
      }]
    }
  }
}