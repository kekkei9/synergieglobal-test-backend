export const addDate = (toBeAddedDate: Date, additionalDate: string) => {
  // Regex to match the duration and unit (e.g., "30d", "5h", "10m")
  const match = additionalDate.match(/^(\d+)([dhm])$/);

  if (!match) {
    throw new Error(
      'Invalid SHORT_LINK_EXPIRATION format. Use <number><unit>, e.g., "30d", "5h", "10m".',
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  let milliseconds;

  switch (unit) {
    case 'd': // days
      milliseconds = value * 24 * 60 * 60 * 1000;
      break;
    case 'h': // hours
      milliseconds = value * 60 * 60 * 1000;
      break;
    case 'm': // minutes
      milliseconds = value * 60 * 1000;
      break;
    default:
      throw new Error(
        'Unsupported time unit. Use "d" for days, "h" for hours, or "m" for minutes.',
      );
  }

  return new Date(toBeAddedDate.getTime() + milliseconds);
};
