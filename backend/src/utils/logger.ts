export const logger = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [LOG]: ${message}`);
};
