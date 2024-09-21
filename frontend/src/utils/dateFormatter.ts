export function formatDate(isoString: string | null) {
   // Create a new Date object from the ISO string
   if (!isoString) {
      return "";
   }
   const date = new Date(isoString);

   // Extract day, month, year, hours, and minutes
   const day = String(date.getUTCDate()).padStart(2, "0");
   const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
   const year = date.getUTCFullYear();
   const hours = String(date.getUTCHours()).padStart(2, "0");
   const minutes = String(date.getUTCMinutes()).padStart(2, "0");

   // Return the formatted string
   return `${day}-${month}-${year} ${hours}:${minutes}`;
}
