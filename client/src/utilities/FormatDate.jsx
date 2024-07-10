const FormatDate = ({ date, date2, date3 }) => {
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
    return new Date(date3).toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
    });
  }
};

export default FormatDate;
