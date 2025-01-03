import { promises as fs } from 'fs';

const readFile = async (filePath: string, isParsed: boolean): Promise<any> => {
  if (!filePath) return null;
  const readData = await fs.readFile(filePath, 'utf-8');
  return isParsed ? JSON.parse(readData) : readData;
};

const writeFile = async (
  filePath: string,
  data: any,
  isStringify: boolean
): Promise<any> => {
  if (!filePath || !data) return null;
  await fs.writeFile(filePath, isStringify ? JSON.stringify(data) : data);
  console.log('writed successfully');
};

export { readFile, writeFile };
