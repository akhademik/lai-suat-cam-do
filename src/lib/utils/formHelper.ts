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
