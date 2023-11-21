import type { TheAssetItem } from '$lib/types/pawn-shop';

const ONE_DAY = 24 * 60 * 60 * 1000;

export const get_total_days = (pawn_date: Date, redemption_date: Date) => {
  const pawn_date_ms = pawn_date.getTime();
  const redemption_date_ms = redemption_date.getTime();
  const total_days = Math.round(Math.abs(redemption_date_ms - pawn_date_ms) / ONE_DAY);
  return total_days + 1;
};

export const format_money_input = (input: string) => {
  input = input
    .replace(/\D/g, '') // remove all non-digit
    .replace(/^0+/, '') // remove leading zero
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // insert ',' every 3 digits for thousand separators
  return input;
};

export const final_interest = (pawn_money_str: string, days: number, interest: number = 0.05) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''));
  const result = Math.round((interest / 30) * days * pawn_money);
  return result;
};

export const format_number_to_string = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const final_money = (pawn_money_str: string, interest: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''));
  const result = pawn_money + interest;
  return format_number_to_string(result);
};

export const final_money_no_format = (pawn_money_str: string, interest: number) => {
  const pawn_money = Number(pawn_money_str.replace(/,/g, ''));
  const result = pawn_money + interest;
  return result;
};

export const init_asset = () => {
  const first_of_month = new Date();
  first_of_month.setDate(1);

  let _asset = {
    pawn_date: first_of_month,
    pawn_money: '',
    total_days: 0,
    redemption_date: new Date()
  };

  const save_asset = sessionStorage.getItem('asset');
  if (save_asset) {
    _asset = JSON.parse(save_asset);
    _asset.pawn_date = new Date(_asset.pawn_date);
    _asset.redemption_date = new Date(_asset.redemption_date);
  }
  return _asset;
};

export const init_asset_array = () => {
  let asset_array: TheAssetItem[] = [];

  const saved_array = sessionStorage.getItem('asset-array');
  if (saved_array) {
    asset_array = JSON.parse(saved_array);
  }
  return asset_array;
};
