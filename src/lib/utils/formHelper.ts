const ONE_DAY = 24 * 60 * 60 * 1000;

export const get_total_days = (pawn_date: Date, redemption_date: Date) => {
  const pawn_date_ms = pawn_date.getTime();
  const redemption_date_ms = redemption_date.getTime();
  const total_days = Math.round(Math.abs(redemption_date_ms - pawn_date_ms) / ONE_DAY);
  return total_days + 1;
};

export const format_money_input = (input: string | undefined) => {
  if (input !== undefined) {
    input = input
      .replace(/\D/g, '') // remove all non-digit
      .replace(/^0+/, '') // remove leading zero
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // insert ',' every 3 digits for thousand separators
    return input;
  }
};

export const get_redemption_money = (
  amount: string | undefined,
  days: number | null,
  interest: number = 0.05
) => {
  if (!amount || !days) return 0;
  const amount_to_number = Number(amount.replace(/,/g, ''));
  const result = Math.round((interest / 30) * days * amount_to_number);

  return result;
};

export const format_number_to_string = (number: number | string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const get_final_money = (amount: string | undefined, interest: number | string) => {
  if (!amount || typeof interest != 'number') return;
  const amount_to_number = Number(amount.replace(/,/g, ''));
  const result = amount_to_number + interest;
  return format_number_to_string(result);
};

export const final_money_no_format = (amount: string | undefined, interest: number | string) => {
  if (!amount || typeof interest != 'number') return;
  const amount_to_number = Number(amount.replace(/,/g, ''));
  const result = amount_to_number + interest;
  return result;
};
