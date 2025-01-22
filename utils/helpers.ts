export function formatCreationDate(creationDate: {
  _seconds: number;
  _nanoseconds: number;
}): { formattedDate: string; formattedTime: string } {
  const milliseconds =
    creationDate._seconds * 1000 + creationDate._nanoseconds / 1e6;
  const date = new Date(milliseconds);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  return { formattedDate, formattedTime };
}
