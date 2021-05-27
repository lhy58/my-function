/**
 * 返回 n 位的随机字符串
 * @param {Number} length
 */
export const getRandomStr = (length: number = 6, chats?: string): string => {
  let str = '';
  if (!chats) chats = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  for (let i = 0; i < length; i += 1) {
    str += chats.charAt(Math.floor(Math.random() * 62));
  }
  return str;
};

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  const chats = '0123456789abcdef';
  return getRandomStr(32, chats);
}

/**
 * 随机生成16位UUID
 * @return string 生成的uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
  });
}