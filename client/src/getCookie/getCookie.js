export const getCookie = (name, cookies) => {
  const searchName = name + "=";
  const searchNameLength = searchName.length;
  const nameIndexStart = cookies.indexOf(searchName);
  const Cookieval = cookies.substring(nameIndexStart + searchNameLength);

  return Cookieval;
};