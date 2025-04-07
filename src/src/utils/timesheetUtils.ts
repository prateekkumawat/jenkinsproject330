export const calculateTotalHours = (clockIn: string, clockOut: string): number => {
  const [inHours, inMinutes] = clockIn.split(":").map(Number);
  const [outHours, outMinutes] = clockOut.split(":").map(Number);
  
  let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  
  return Number((totalMinutes / 60).toFixed(2));
};

export const formatDuration = (clockIn: string, clockOut: string): string => {
  if (!clockIn || !clockOut) return "";
  
  try {
    const [inHours, inMinutes] = clockIn.split(":").map(Number);
    const [outHours, outMinutes] = clockOut.split(":").map(Number);
    
    let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
    
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours} hours ${minutes} minutes`;
  } catch (e) {
    return "Invalid time format";
  }
};

// Define leave type colors with a consistent color palette
export const leaveTypeColors = {
  casual: { bg: "#D3E4FD", text: "#0C4A8A" },      // Soft Blue
  sick: { bg: "#D3E4FD", text: "#0C4A8A" },        // Soft Blue
  vacation: { bg: "#D3E4FD", text: "#0C4A8A" },    // Soft Blue
  maternity: { bg: "#D3E4FD", text: "#0C4A8A" },   // Soft Blue
  paternity: { bg: "#D3E4FD", text: "#0C4A8A" },   // Soft Blue
  bereavement: { bg: "#D3E4FD", text: "#0C4A8A" }, // Soft Blue
  unpaid: { bg: "#D3E4FD", text: "#0C4A8A" },      // Soft Blue
  default: { bg: "#D3E4FD", text: "#0C4A8A" }      // Soft Blue
};
