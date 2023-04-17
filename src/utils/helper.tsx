export const isPositiveInteger = (stringNum: any) => {
  const number = Number(stringNum);
  const isInteger = Number.isInteger(number);
  const isPositive = number > 0;

  return isInteger && isPositive;
};


export const paramIdSanitiser = (id:any):number => {
    return (isPositiveInteger(id))? Number(id):0;
}