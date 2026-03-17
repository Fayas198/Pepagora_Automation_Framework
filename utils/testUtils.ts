import * as fs from 'fs';
import * as path from 'path';

export function getTestData(key: string) {
  const dataPath = path.resolve(__dirname, '../../specs/buyingRequestTestData.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data[key];
}