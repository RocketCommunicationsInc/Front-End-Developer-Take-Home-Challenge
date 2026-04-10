import { isNum } from '@utils/helpers';

function getUTCTime(timestamp: number): string {
  if (isNum(timestamp)) {
    // If the UNIX timestamp is in milliseconds - convert to seconds for accurete UTC date creation
    const date = new Date(
      isMilliseconds(timestamp) ? timestamp : timestamp * 1000
    );
    return date.toISOString().split('T')[1].split('.')[0];
  } else {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
}

function isMilliseconds(timestamp: number): boolean {
  return timestamp.toString().length === 13;
}

export { getUTCTime, isMilliseconds };
