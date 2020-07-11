export function dateFmt(stringTimestamp) {
  return new Date(stringTimestamp).toLocaleString();
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
