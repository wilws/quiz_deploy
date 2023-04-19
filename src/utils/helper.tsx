export const isPositiveInteger = (stringNum: any) => {
  const number = Number(stringNum);
  const isInteger = Number.isInteger(number);
  const isPositive = number > 0;

  return isInteger && isPositive;
};


export const paramIdSanitiser = (id:any):number => {
    return (isPositiveInteger(id))? Number(id):-1;
}


export const gradientColorGenerator = (id:number):Array<string> => {
  
  const colormMatch = [
    ["#C6FFDD", "#F27121"],
    ["#DAD299", "#B0DAB9"],

    ["#ffdde1", "#ee9ca7"],
    ["#E0EAFC", "#CFDEF3"],
    ["#a8ff78", "#78ffd6"],
    ["#c2e59c", "#64b3f4"],

    ["#fffbd5", "#DD2476"],
    ["#FFEEEE", "#DDEFBB"],
    ["#ffd194", "#70e1f5"],
    ["#ECE9E6", "#6dd5ed"],
    ["#E6DADA", "#274046"],
  ];

 

  return colormMatch[id%10];


}