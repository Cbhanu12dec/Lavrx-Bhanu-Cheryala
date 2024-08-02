import React from "react";
import LanguageSelectionComponent from "./components/LanguageSelectionComponent";
import "./styles/App.css";

const App: React.FC = () => {
  const items = ["en-US", "en-GB", "pt-BR"];

  return (
    <div className="App">
      <LanguageSelectionComponent items={items} />
    </div>
  );
};

export default App;
