import "../styles/LanguageSelectionComponent.css";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "moment/locale/en-gb";
import "moment/locale/pt-br";
import { timezones } from "./utils";

interface LanguageSelectionComponentProps {
  items: string[];
}

const LanguageSelectionComponent: React.FC<LanguageSelectionComponentProps> = ({
  items,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(items[0]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentTimeUsingMoment, setCurrentTimeUsingMoment] =
    useState<string>("");

  const getTimeUsingInternationalization = () => {
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat(selectedLanguage, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(now);
    setCurrentTime(formattedTime);
  };

  const getTimeUsingMoment = () => {
    const now = moment();
    const { zone, format } = timezones[selectedLanguage];
    const zonedTime = now.tz(zone);
    const formattedTime = zonedTime.format(format);
    setCurrentTimeUsingMoment(formattedTime);
  };

  const getCurrentTime = () => {
    getTimeUsingInternationalization();
    getTimeUsingMoment();
  };

  useEffect(() => {
    getCurrentTime();
    const intervalId = setInterval(getCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, [selectedLanguage]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="time-wrapper">
      <h3>Select a option to view time</h3>
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className="time-zone-selector"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="internationalization-time">
        Current Time using Internationalization: {currentTime}
      </div>
      <div className="moment-time">
        Current Time using Moment: {currentTimeUsingMoment}
      </div>
    </div>
  );
};

export default LanguageSelectionComponent;
