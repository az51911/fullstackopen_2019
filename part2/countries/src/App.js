import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearch] = useState("");
  const [targetCountry, setNewCountry] = useState("");

  const handleSearchChange = event => {
    //console.log(event.target.value);
    setSearch(event.target.value);
    setNewCountry("");
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter
        input_string={searchString}
        change_function={handleSearchChange}
      />
      <Countries
        countries_info={countries}
        search_string={searchString}
        target_country={targetCountry}
        set_newCountry={setNewCountry}
      />
    </div>
  );
};

export default App;
