export const formatDate = (dateString: string | undefined) => {
    if (dateString === undefined) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

export const formatTime = (dateString: string | undefined) => {
    if (dateString === undefined) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    }).format(date);
  };
  