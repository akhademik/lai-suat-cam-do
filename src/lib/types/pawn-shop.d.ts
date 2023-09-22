export type TheAsset = {
  pawn_date: Date;
  pawn_money: string | undefined;
  total_days: number | null;
  redemption_date: Date;
};

export type TheAssetItem = {
  id: string;
  pawn_money: string | undefined;
  total_days: number | null;
};
