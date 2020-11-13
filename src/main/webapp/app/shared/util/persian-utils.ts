var map = ["&\#1632;", "&\#1633;", "&\#1634;", "&\#1635;", "&\#1636;", "&\#1637;", "&\#1638;", "&\#1639;", "&\#1640;", "&\#1641;"];

export const persianNumber = (num: number):string => {
  let newStr = "";
  const str = String(num);
  for(let i=0; i<str.length; i++){
    newStr += map[parseInt(str.charAt(i))];
  }
  return newStr;
};
