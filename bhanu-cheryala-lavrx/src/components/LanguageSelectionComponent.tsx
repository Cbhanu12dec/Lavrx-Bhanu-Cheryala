import React, { useState, useEffect } from "react";
import moment from "moment";

interface LanguageSelectionComponentProps {
  items: string[];
}

const LanguageSelectionComponent: React.FC<LanguageSelectionComponentProps> = ({
  items,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(items[0]);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
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

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [selectedLanguage]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="time-wrapper">
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
      <p>Current Time: {currentTime}</p>
    </div>
  );
};

export default LanguageSelectionComponent;
