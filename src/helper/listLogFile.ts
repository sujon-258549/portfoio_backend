import path from 'path';
import fs from 'fs';

export const listLogFile = (logType: string): string[] => {
  const logDir = path.join(process.cwd(), 'logs', 'winston', logType);
  try {
    return fs.readdirSync(logDir).filter((file) => file.endsWith('.log'));
  } catch (error) {
    console.error('Error reading log files:', error, 'logType', logType);
    return [];
  }
};
