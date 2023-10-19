/**
 * Convert numeric amount to EGLD value
 * @param amount Numeric amount to be converted
 * @returns EGLD amount
 */
export const toEgldAmount = (amount: number) => {
  return (amount / Math.pow(10, 18)).toString();
};
