export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export function capitalizeEachWord(text: string) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function convertInputDate(inputDate: string | undefined): string {
  if (!inputDate) return ""; // Mengembalikan string kosong jika inputDate undefined

  // Check if inputDate is in the expected format (MM/DD/YYYY)
  const date = new Date(inputDate);
  const isoString = date.toISOString().split("T")[0];
  return isoString;
}

export function convertDateToISOString(formattedDate: string) {
  const dateObject = new Date(formattedDate);
  const isoString = dateObject.toISOString(); // hasilnya adalah format ISOString

  return isoString // Output: "2022-05-23T00:00:00.000Z"
}