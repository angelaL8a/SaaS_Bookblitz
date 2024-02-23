const CurrentDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the starting day of the week (Monday)
  const startingDayOfWeek = new Date(currentDate);
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1;
  startingDayOfWeek.setDate(
    currentDate.getDate() - currentDayOfWeek + mondayOffset
  );

  // Array to store the days of the week
  const daysOfWeek = [];

  // Loop through the days of the week (Monday to Sunday)
  for (let i = 0; i < 7; i++) {
    const day = new Date(startingDayOfWeek);
    day.setDate(startingDayOfWeek.getDate() + i);
    daysOfWeek.push(day);
  }

  // Format the date as "MMM DD"
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Render the days
  return (
    <div className="w-[380px] flex justify-between items-center">
      <span className="text-[#515151] font-poppins text-[24px]">
        {formatDate(daysOfWeek[0])}
        {" - "}
        {formatDate(daysOfWeek[daysOfWeek.length - 1])}
      </span>

      <div>{currentDate.getFullYear()}</div>
    </div>
  );
};

export default CurrentDate;
