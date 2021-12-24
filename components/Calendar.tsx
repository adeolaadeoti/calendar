import React from "react";

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = ({}) => {
  const date = new Date();

  const [isCalendarOpen, setIsCalendarOpen] = React.useState<boolean>(true);
  const [month, setMonth] = React.useState<string>("July");
  const [year, setYear] = React.useState<string>("2029");
  const [previousDays, setPreviousDays] = React.useState<Array<number>>([]);
  const [currentDays, setCurrentDays] = React.useState<Array<number>>([]);
  const [nextDays, setNextDays] = React.useState<Array<number>>([]);
  let [monthIndex, setMonthIndex] = React.useState<number>(date.getMonth());
  let [yesterday, setYesterday] = React.useState<number>();
  let [thisMonday, setThisMonday] = React.useState<number>();
  let [lastMonday, setLastMonday] = React.useState<number>();
  let [thisMonth, setThisMonth] = React.useState<boolean>(false);
  let [lastMonth, setLastMonth] = React.useState<boolean>(false);
  let [customDate, setCustomDate] = React.useState<boolean>(false);
  let [dropdownText, setDropdownText] = React.useState<string>("Today");
  let [today, setToday] = React.useState<number>(new Date().getDate());

  React.useEffect(() => {
    renderCalendar();
  }, []);

  const renderCalendar: () => void = () => {
    date.setDate(1);
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setMonth(months[date.getMonth()]);
    setYear(date.getFullYear().toString());

    const lastDay: number = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay: number = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const firstDayIndex: number = date.getDay();

    const lastDayIndex: number = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    const nextDays: number = 7 - lastDayIndex - 1;

    // prev days
    let previousDays: number[] = [];
    for (let x = firstDayIndex; x > 0; x--) {
      previousDays.push(prevLastDay - x + 1);
      setPreviousDays([...previousDays]);
    }

    // current days
    let currentDays: number[] = [];
    for (let i = 1; i <= lastDay; i++) {
      currentDays.push(i);
      setCurrentDays([...currentDays]);
    }

    // next days
    let nextDate: number[] = [];
    for (let j = 1; j <= nextDays; j++) {
      nextDate.push(j);
      setNextDays([...nextDate]);
    }
  };

  const previousMonth: () => void = () => {
    date.setMonth(monthIndex - 1);
    setMonthIndex(--monthIndex);
    setToday(0);
    setYesterday(undefined);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setLastMonth(false);
    setThisMonth(false);
    setCustomDate(false);

    renderCalendar();
  };

  const nextMonth: () => void = () => {
    date.setMonth(monthIndex + 1);
    setMonthIndex(++monthIndex);
    setToday(0);
    setYesterday(undefined);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setLastMonth(false);
    setThisMonth(false);
    setCustomDate(false);

    renderCalendar();
  };

  // dropdown buttons
  const renderToday: () => void = () => {
    date.setMonth(date.getMonth());
    setMonthIndex(date.getMonth());
    setYesterday(undefined);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setCustomDate(false);
    setLastMonth(false);
    setThisMonth(false);
    setDropdownText("Today");

    const today = new Date().getDate();
    setToday(today);
    renderCalendar();
  };

  const renderYesterday: () => void = () => {
    date.setMonth(date.getMonth());
    setMonthIndex(date.getMonth());
    setToday(0);
    setYesterday(new Date().getDate() - 1);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setCustomDate(false);
    setLastMonth(false);
    setThisMonth(false);
    setDropdownText("Yesterday");

    renderCalendar();
  };

  const renderThisMonday: () => void = () => {
    date.setMonth(date.getMonth());
    setMonthIndex(date.getMonth());
    setToday(0);
    setYesterday(undefined);
    setLastMonday(undefined);
    setCustomDate(false);
    setLastMonth(false);
    setThisMonth(false);
    setDropdownText("This Monday");

    const dateIndex = date.getDay();

    switch (dateIndex) {
      case 0:
        setThisMonday(date.getDate() + 1);
        break;
      case 1:
        setThisMonday(date.getDate());
        break;
      case 2:
        setThisMonday(date.getDate() - 1);
        break;
      case 3:
        setThisMonday(date.getDate() - 2);
        break;
      case 4:
        setThisMonday(date.getDate() - 3);
        break;
      case 5:
        setThisMonday(date.getDate() - 4);
        break;
      case 6:
        setThisMonday(date.getDate() - 5);
        break;
      default:
        break;
    }

    renderCalendar();
  };

  const renderLastMonday: () => void = () => {
    date.setMonth(date.getMonth());
    setMonthIndex(date.getMonth());
    setToday(0);
    setYesterday(undefined);
    setThisMonday(undefined);
    setCustomDate(false);
    setLastMonth(false);
    setThisMonth(false);
    setDropdownText("Last Monday");

    const dateIndex = date.getDay();

    switch (dateIndex) {
      case 0:
        setLastMonday(date.getDate() - 6);
        break;
      case 1:
        setLastMonday(date.getDate() - 7);
        break;
      case 2:
        setLastMonday(date.getDate() - 8);
        break;
      case 3:
        setLastMonday(date.getDate() - 9);
        break;
      case 4:
        setLastMonday(date.getDate() - 10);
        break;
      case 5:
        setLastMonday(date.getDate() - 11);
        break;
      case 6:
        setLastMonday(date.getDate() - 12);
        break;
      default:
        break;
    }

    renderCalendar();
  };

  const renderThisMonth: () => void = () => {
    date.setMonth(date.getMonth());
    setMonthIndex(date.getMonth());
    setToday(0);
    setYesterday(0);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setLastMonth(false);
    setThisMonth(true);
    setCustomDate(false);
    setDropdownText("This Month");

    renderCalendar();
  };

  const renderLastMonth: () => void = () => {
    date.setMonth(date.getMonth() - 1);
    setMonthIndex(date.getMonth() - 1);
    setToday(0);
    setYesterday(0);
    setThisMonday(undefined);
    setLastMonday(undefined);
    setThisMonth(false);
    setLastMonth(true);
    setCustomDate(false);
    setDropdownText("Last Month");

    renderCalendar();
  };

  const highlightCustom: () => void = () => {
    if (monthIndex !== date.getMonth() && monthIndex !== date.getMonth() - 1) {
      setLastMonth(false);
      setThisMonth(false);
      setCustomDate(true);
      setDropdownText("Custom");
    }
  };

  return (
    <>
      <div className="calendar-wrapper">
        <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <span>{dropdownText}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5.71429H5.71429V10H4.28571V5.71429H0V4.28571H4.28571V0H5.71429V4.28571H10V5.71429Z"
              fill="#706F6C"
            />
          </svg>

          {/* <img src="svg/plus.svg" alt="plus icon" /> */}
        </button>

        <div className={`calendar ${isCalendarOpen ? "openCalendar" : ""}`}>
          <ul className="calendar__left">
            <li
              onClick={renderToday}
              className={`${today && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.38867 10.8105L4.15723 12.167C4.10449 12.4775 4.23047 12.7852 4.48535 12.9697C4.62891 13.0723 4.79883 13.1279 4.96582 13.1279C5.09473 13.1279 5.22656 13.0957 5.34668 13.0312L6.5625 12.3926L7.77832 13.0312C8.05664 13.1777 8.3877 13.1543 8.64258 12.9697C8.89746 12.7852 9.02344 12.4775 8.9707 12.167L8.73926 10.8105L9.7207 9.85254C9.94629 9.63281 10.0254 9.31055 9.92871 9.01172C9.83203 8.71289 9.57715 8.49902 9.2666 8.45508L7.90723 8.25586L7.30078 7.02246C7.15723 6.73828 6.87598 6.5625 6.5625 6.5625C6.24902 6.5625 5.96777 6.73828 5.83008 7.01953L5.22363 8.25293L3.86426 8.45215C3.55371 8.49609 3.29883 8.70996 3.20215 9.00879C3.10547 9.30762 3.18457 9.62988 3.41016 9.84961L4.38867 10.8105ZM5.8418 9.1084L6.5625 7.64648L7.2832 9.1084L8.89453 9.34277L7.72852 10.4824L8.00391 12.0879L6.5625 11.332L5.12109 12.0908L5.39648 10.4854L4.23047 9.3457L5.8418 9.1084ZM11.7188 1.875H10.3125V0.234375C10.3125 0.105469 10.207 0 10.0781 0H9.60938C9.48047 0 9.375 0.105469 9.375 0.234375V1.875H3.75V0.234375C3.75 0.105469 3.64453 0 3.51562 0H3.04688C2.91797 0 2.8125 0.105469 2.8125 0.234375V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM12.1875 13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938ZM12.1875 4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875Z" />
              </svg>
              <span>Today</span>
            </li>
            <li
              onClick={renderYesterday}
              className={`${yesterday && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.234375C10.3125 0.105469 10.207 0 10.0781 0H9.60938C9.48047 0 9.375 0.105469 9.375 0.234375V1.875H3.75V0.234375C3.75 0.105469 3.64453 0 3.51562 0H3.04688C2.91797 0 2.8125 0.105469 2.8125 0.234375V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM12.1875 13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938ZM12.1875 4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875ZM3.28125 11.25H6.09375C6.35156 11.25 6.5625 11.0391 6.5625 10.7812V7.96875C6.5625 7.71094 6.35156 7.5 6.09375 7.5H3.28125C3.02344 7.5 2.8125 7.71094 2.8125 7.96875V10.7812C2.8125 11.0391 3.02344 11.25 3.28125 11.25ZM3.75 8.4375H5.625V10.3125H3.75V8.4375Z" />
              </svg>

              <span>Yesterday</span>
            </li>
            <li
              onClick={renderThisMonday}
              className={`${thisMonday && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.351562C10.3125 0.158203 10.1543 0 9.96094 0H9.72656C9.5332 0 9.375 0.158203 9.375 0.351562V1.875H3.75V0.351562C3.75 0.158203 3.5918 0 3.39844 0H3.16406C2.9707 0 2.8125 0.158203 2.8125 0.351562V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125ZM11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625ZM9.02344 10.3125H4.10156C3.9082 10.3125 3.75 10.1543 3.75 9.96094V9.72656C3.75 9.5332 3.9082 9.375 4.10156 9.375H9.02344C9.2168 9.375 9.375 9.5332 9.375 9.72656V9.96094C9.375 10.1543 9.2168 10.3125 9.02344 10.3125Z" />
              </svg>

              <span>This Monday </span>
            </li>
            <li
              onClick={renderLastMonday}
              className={`${lastMonday && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.351562C10.3125 0.158203 10.1543 0 9.96094 0H9.72656C9.5332 0 9.375 0.158203 9.375 0.351562V1.875H3.75V0.351562C3.75 0.158203 3.5918 0 3.39844 0H3.16406C2.9707 0 2.8125 0.158203 2.8125 0.351562V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125ZM11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625ZM9.02344 10.3125H4.10156C3.9082 10.3125 3.75 10.1543 3.75 9.96094V9.72656C3.75 9.5332 3.9082 9.375 4.10156 9.375H9.02344C9.2168 9.375 9.375 9.5332 9.375 9.72656V9.96094C9.375 10.1543 9.2168 10.3125 9.02344 10.3125Z" />
              </svg>
              <span>Last Monday</span>
            </li>
            <li
              onClick={renderThisMonth}
              className={`${thisMonth && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.234375C10.3125 0.105469 10.207 0 10.0781 0H9.60938C9.48047 0 9.375 0.105469 9.375 0.234375V1.875H3.75V0.234375C3.75 0.105469 3.64453 0 3.51562 0H3.04688C2.91797 0 2.8125 0.105469 2.8125 0.234375V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM12.1875 13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938ZM12.1875 4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875ZM2.34375 10.3125H10.7812C11.0391 10.3125 11.25 10.1016 11.25 9.84375V7.03125C11.25 6.77344 11.0391 6.5625 10.7812 6.5625H2.34375C2.08594 6.5625 1.875 6.77344 1.875 7.03125V9.84375C1.875 10.1016 2.08594 10.3125 2.34375 10.3125ZM2.8125 7.5H10.3125V9.375H2.8125V7.5Z" />
              </svg>

              <span>This Month</span>
            </li>
            <li
              onClick={renderLastMonth}
              className={`${lastMonth && "dropdown-active"}`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.234375C10.3125 0.105469 10.207 0 10.0781 0H9.60938C9.48047 0 9.375 0.105469 9.375 0.234375V1.875H3.75V0.234375C3.75 0.105469 3.64453 0 3.51562 0H3.04688C2.91797 0 2.8125 0.105469 2.8125 0.234375V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM12.1875 13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938ZM12.1875 4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875ZM2.34375 10.3125H10.7812C11.0391 10.3125 11.25 10.1016 11.25 9.84375V7.03125C11.25 6.77344 11.0391 6.5625 10.7812 6.5625H2.34375C2.08594 6.5625 1.875 6.77344 1.875 7.03125V9.84375C1.875 10.1016 2.08594 10.3125 2.34375 10.3125ZM2.8125 7.5H10.3125V9.375H2.8125V7.5Z" />
              </svg>

              <span>Last Month</span>
            </li>
            <li className={`${customDate && "dropdown-active"}`}>
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.7188 1.875H10.3125V0.351562C10.3125 0.158203 10.1543 0 9.96094 0H9.72656C9.5332 0 9.375 0.158203 9.375 0.351562V1.875H3.75V0.351562C3.75 0.158203 3.5918 0 3.39844 0H3.16406C2.9707 0 2.8125 0.158203 2.8125 0.351562V1.875H1.40625C0.629883 1.875 0 2.50488 0 3.28125V13.5938C0 14.3701 0.629883 15 1.40625 15H11.7188C12.4951 15 13.125 14.3701 13.125 13.5938V3.28125C13.125 2.50488 12.4951 1.875 11.7188 1.875ZM1.40625 2.8125H11.7188C11.9766 2.8125 12.1875 3.02344 12.1875 3.28125V4.6875H0.9375V3.28125C0.9375 3.02344 1.14844 2.8125 1.40625 2.8125ZM11.7188 14.0625H1.40625C1.14844 14.0625 0.9375 13.8516 0.9375 13.5938V5.625H12.1875V13.5938C12.1875 13.8516 11.9766 14.0625 11.7188 14.0625ZM7.49121 7.90137L8.50488 8.91504C8.56641 8.97656 8.56641 9.07324 8.50488 9.13184L4.66113 12.9756L3.63281 13.1221C3.43066 13.1514 3.25488 12.9785 3.28418 12.7734L3.43066 11.7451L7.27441 7.90137C7.33301 7.84277 7.43262 7.84277 7.49121 7.90137ZM9.69434 7.94238L9.13184 8.50488C9.07031 8.56641 8.97363 8.56641 8.91504 8.50488L7.90137 7.49121C7.83984 7.42969 7.83984 7.33301 7.90137 7.27441L8.46387 6.71191C8.66309 6.5127 8.98828 6.5127 9.1875 6.71191L9.69434 7.21875C9.89355 7.41797 9.89355 7.74316 9.69434 7.94238Z" />
              </svg>

              <span>Custom</span>
            </li>
          </ul>
          <div className="calendar__right">
            <div className="month">
              <svg
                onClick={previousMonth}
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.139686 4.00259L4.00279 0.139686C4.18904 -0.0465619 4.49117 -0.0465619 4.67742 0.139686L5.12803 0.590298C5.31408 0.776347 5.31428 1.07768 5.12882 1.26413L2.06716 4.3399L5.12863 7.41587C5.31428 7.60232 5.31388 7.90365 5.12783 8.0897L4.67722 8.54031C4.49097 8.72656 4.18884 8.72656 4.00259 8.54031L0.139686 4.67721C-0.046562 4.49097 -0.046562 4.18884 0.139686 4.00259V4.00259Z"
                  fill="#0E9888"
                />
              </svg>

              <h4>
                {month}, {year}
              </h4>
              <svg
                onClick={nextMonth}
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.86031 4.00259L1.99721 0.139686C1.81096 -0.0465619 1.50883 -0.0465619 1.32258 0.139686L0.87197 0.590298C0.685921 0.776347 0.685722 1.07768 0.871175 1.26413L3.93284 4.3399L0.871373 7.41587C0.685722 7.60232 0.68612 7.90365 0.872169 8.0897L1.32278 8.54031C1.50903 8.72656 1.81116 8.72656 1.99741 8.54031L5.86031 4.67721C6.04656 4.49097 6.04656 4.18884 5.86031 4.00259Z"
                  fill="#0E9888"
                />
              </svg>
            </div>

            <div className="weekdays">
              <p>S</p>
              <p>M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
            </div>

            {previousDays && (
              <div className="days">
                {previousDays.map((day, index) => (
                  <p
                    onClick={highlightCustom}
                    className="day prev-date"
                    key={index}
                  >
                    {day}
                  </p>
                ))}

                {currentDays.map((day, index) => {
                  if (day === today) {
                    return (
                      <p
                        onClick={highlightCustom}
                        className={`day ${today && "activeDay"}`}
                        key={index}
                      >
                        {day}
                      </p>
                    );
                  } else if (day === yesterday) {
                    return (
                      <p
                        onClick={highlightCustom}
                        className={`day ${yesterday && "activeDay"}`}
                        key={index}
                      >
                        {day}
                      </p>
                    );
                  } else if (day === thisMonday) {
                    return (
                      <p
                        onClick={highlightCustom}
                        className={`day ${thisMonday && "activeDay"}`}
                        key={index}
                      >
                        {day}
                      </p>
                    );
                  } else if (day === lastMonday) {
                    return (
                      <p
                        onClick={highlightCustom}
                        className={`day ${lastMonday && "activeDay"}`}
                        key={index}
                      >
                        {day}
                      </p>
                    );
                  } else {
                    return (
                      <p onClick={highlightCustom} className="day" key={index}>
                        {day}
                      </p>
                    );
                  }
                })}

                {nextDays.map((day, index) => (
                  <p
                    onClick={highlightCustom}
                    className="day next-date"
                    key={index}
                  >
                    {day}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .calendar-wrapper button {
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
          background: #fff;
          border: 0.1rem solid #e3e3e0;
          box-sizing: border-box;
          box-shadow: 0px 1px 0px rgba(20, 20, 0, 0.051);
          border-radius: 0.8rem;
          padding: 1rem 1.5rem;
          width: 13.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: "SF Pro Display", sans-serif;
          font-size: 1.3rem;
          line-height: 1.6rem;
          color: #706f6c;
        }
        .calendar-wrapper button svg {
          /* height: 1rem; */
        }
        .calendar-wrapper .calendar {
          margin-top: 1rem;
          display: grid;
          grid-template-columns: 18rem 30rem;
          width: 48rem;
          border: 0.1rem solid #f3f3f2;
          box-shadow: 0px 1px 1px rgba(20, 20, 0, 0.051);
          border-radius: 1.2rem;
          display: none;
        }

        .calendar-wrapper .calendar__left {
          grid-column: 0.5;
          background: #f9f9f8;
          padding: 2rem;
          list-style: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .calendar-wrapper .calendar__left li {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0.75rem;
          font-family: "SF Pro Display", sans-serif;
        }
        .calendar-wrapper .calendar__left li svg {
          margin-right: 1rem;
        }
        .calendar-wrapper .calendar__left li svg path {
          fill: #90908c;
        }
        .calendar-wrapper .calendar__left li span {
          font-size: 1.3rem;
          line-height: 1.6rem;
          color: #90908c;
        }
        .calendar-wrapper .calendar .dropdown-active {
          background: #f1f1ef;
          border-radius: 6px;
        }
        .calendar-wrapper .calendar .dropdown-active svg path {
          fill: #0e9888;
        }
        .calendar-wrapper .calendar .dropdown-active span {
          font-family: "SF Pro Display Bold", sans-serif;
          color: #0e9888;
        }
        .calendar-wrapper .calendar__right {
          grid-column: -2;
        }
        .calendar-wrapper .calendar__right p {
          font-family: "SF Pro Display Bold", sans-serif;
          font-size: 1.3rem;
          line-height: 1.6rem;
          color: #c8c7c1;
        }
        .calendar-wrapper .calendar__right .month {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }
        .calendar-wrapper .calendar__right .month svg {
          cursor: pointer;
        }
        .calendar-wrapper .calendar__right .month h4 {
          font-family: "SF Pro Display Bold", sans-serif;
          font-size: 1.3rem;
          line-height: 1.6rem;
          color: #706f6c;
        }
        .calendar-wrapper .calendar__right .weekdays {
          width: 100%;
          padding: 0 0.4rem;
          margin-top: 1rem;
          display: flex;
          align-items: center;
        }
        .calendar-wrapper .calendar__right .weekdays p {
          width: calc(29.2rem / 7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .calendar-wrapper .calendar__right .days {
          margin-top: 1rem;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 0.2rem;
        }
        .calendar-wrapper .calendar__right .days p {
          margin: 0.3rem;
          width: calc(25.2rem / 7);
          cursor: pointer;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #706f6c;
          border-radius: 0.6rem;
          /* border: 0.1rem solid transparent; */
        }
        .calendar-wrapper .calendar__right .days p:hover:not(.today) {
          /* border: 0.1rem solid #c8c7c1; */
        }
        .calendar-wrapper .calendar__right .activeDay {
          background: #0e9888;
          color: #fff !important;
        }
        .calendar-wrapper .calendar__right .prev-date,
        .calendar-wrapper .calendar__right .next-date {
          color: #c8c7c1 !important;
          cursor: auto !important;
          /* border: 0.1rem solid transparent !important; */
        }
        .calendar-wrapper .calendar__right .prev-date:hover,
        .calendar-wrapper .calendar__right .next-date:hover {
          /* border: 0.1rem solid #fff !important; */
        }
        .calendar-wrapper .openCalendar {
          display: grid;
        }

        ul {
          margin-top: 0rem;
          margin-bottom: 0rem;
        }
      `}</style>
    </>
  );
};

export default Calendar;
