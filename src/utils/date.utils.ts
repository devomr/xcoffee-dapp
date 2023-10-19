/**
 * Get the date from the timestamp string (2023-10-19T17:58:30.000Z)
 * @param timestamp Timestmap string
 * @returns Date value
 */
export const getDateFromTimestampString = (timestamp: string) => {
  if (!timestamp) {
    return timestamp;
  }

  return timestamp.split('T')[0];
};

/**
 * Adds a given number of seconds to the current date time.
 * @param seconds Number of seconds
 * @returns New date
 */
export const addSecondsToCurrentDate = (seconds: number) => {
  const currentDate = new Date();
  return new Date(currentDate.getTime() + seconds * 1000);
};
