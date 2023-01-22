export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFromEnum = <T extends { [key: number]: string | number }>(
  enm: T
): T[keyof T] => {
  const enumKeys = Object.keys(enm);
  const randomKey = enumKeys[Math.floor(Math.random() * enumKeys.length)];
  const randomKeyNumber = Number(randomKey);

  return isNaN(randomKeyNumber)
    ? enm[randomKey as keyof T]
    : (randomKeyNumber as unknown as T[keyof T]);
};

export const toFirstLetterUpperCase = (str: string) => {
  return `${str[0].toUpperCase()}${str.substring(1)}`;
};
