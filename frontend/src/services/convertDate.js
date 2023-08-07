export function convertDate(date) {
  const timeUnits = [
    { unit: "y", milliseconds: 31536000000 },
    { unit: "m", milliseconds: 2592000000 },
    { unit: "w", milliseconds: 604800000 },
    { unit: "d", milliseconds: 86400000 },
    { unit: "h", milliseconds: 3600000 },
    { unit: "min", milliseconds: 60000 }, // Use "min" for minutes
    { unit: "s", milliseconds: 1000 }, // Add entry for seconds
  ];

  const currentDate = new Date();
  const timeDifference = currentDate - date;

  for (const unitData of timeUnits) {
    if (timeDifference >= unitData.milliseconds) {
      return (
        Math.floor(timeDifference / unitData.milliseconds) +
        unitData.unit +
        " ago"
      );
    }
  }

  return "Just now";
}
