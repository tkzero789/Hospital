const FormatDate = ({ date, date2, date3 }) => {
  const createDate = (dateString) => {
    const [year, month, day] = dateString
      .split("-")
      .map((num) => parseInt(num, 10));
    // Create a date object with a specified time to avoid time zone issues
    return new Date(Date.UTC(year, month - 1, day, 12));
  };

  if (date) {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  } else if (date2) {
    return new Date(date2).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  } else if (date3) {
    return createDate(date3).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
    });
  }
};

export default FormatDate;
