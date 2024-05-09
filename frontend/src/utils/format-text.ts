export const titleCase = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatLicensePlate = (licensePlate: string): string => {
  const [part1, part2, part3] = licensePlate.split(/[- ]/);
  return `${part1.toUpperCase()}-${part2}-${part3.toUpperCase()}`;
};

export const nextYear = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
}