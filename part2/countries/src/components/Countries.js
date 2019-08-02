import React, { useState, useEffect } from "react";

import axios from "axios";

const Languages = ({ languages }) => {
    return <li>{languages}</li>;
};

const ListLanguages = ({ input_country_languages }) => {
    //console.log(input_country_languages);
    let language_array = input_country_languages.map(element => (
        <Languages key={element.name} languages={element.name} />
    ));
    return language_array;
};

const DisplayFlag = ({ input_country }) => {
    return <img src={input_country} alt="" height="90" width="150" />;
};

const GetWeather = (capital_city, setWeatherFunction) => {
    console.log("target capital city outside useeffect is", capital_city);
    useEffect(() => {
        console.log("target capital city inside effect function is", capital_city);
        axios
            .get(
                `https://api.apixu.com/v1/current.json?key=50bc8729bd7c40208cd25609192407&q=${capital_city}`
            )
            .then(response => {
                console.log("weather promise fulfilled");
                setWeatherFunction(response.data.current);
                console.log(response.data);
            });
    }, [capital_city, setWeatherFunction]);
    console.log("target weather is returned");
};

const DisplayWeather = ({ targetweather }) => {
    console.log("targetweather to display is", targetweather);

    if (targetweather !== "") {
        return (
            <div>
                <b>Temperature:</b> {targetweather.temp_c} Celsius
        <div>
                    <img
                        src={targetweather.condition.icon}
                        alt=""
                        height="60"
                        width="60"
                    />
                </div>
                <div>
                    <b>wind: </b>
                    {targetweather.wind_kph} kph direction {targetweather.wind_dir}
                </div>
            </div>
        );
    } else {
        console.log("still waiting on weather data");
        return <div>no weather yet</div>;
    }
};

const FormattedCountry = ({ input_country }) => {
    const [targetWeather, setWeather] = useState("");
    useEffect(() => {
        console.log("getting weather for capital city", input_country.capital);
        axios
            .get(
                `https://api.apixu.com/v1/current.json?key=50bc8729bd7c40208cd25609192407&q=${
                input_country.capital
                }`
            )
            .then(response => {
                console.log("weather promise fulfilled");
                setWeather(response.data.current);
            });
    }, []);

    if (targetWeather === "") {
        return <div />;
    } else {
        return (
            <div>
                <h1>{input_country.name}</h1>
                <div>capital {input_country.capital}</div>
                <div>population {input_country.population}</div>
                <h2>Languages</h2>
                <ul>
                    <ListLanguages input_country_languages={input_country.languages} />
                </ul>
                <DisplayFlag input_country={input_country.flag} />
                <h2>Weather in {input_country.capital}</h2>
                <DisplayWeather targetweather={targetWeather} />
            </div>
        );
    }
};

const Country = ({ name, Country_Show_Handler, Capital_Handler }) => {
    return (
        <div>
            {name}{" "}
            <button
                onClick={() => {
                    Country_Show_Handler(name);
                }}
            >
                show
      </button>
        </div>
    );
};

const Countries = ({
    countries_info,
    search_string,
    target_country,
    set_newCountry
}) => {
    let showAll = search_string === "";

    const CountriesToShow = showAll
        ? []
        : countries_info.filter(country =>
            country.name.toUpperCase().includes(search_string.toUpperCase())
        );

    const entries = () =>
        CountriesToShow.map(country => (
            <Country
                key={country.name}
                name={country.name}
                Country_Show_Handler={set_newCountry}
            />
        ));

    if (CountriesToShow.length > 10) {
        return <div>too many entries, specify another filter</div>;
    } else if (CountriesToShow.length === 1) {
        return (
            <div>
                <FormattedCountry input_country={CountriesToShow[0]} />
            </div>
        );
    } else if (target_country !== "" && CountriesToShow !== []) {
        let FilteredCountries = CountriesToShow.filter(
            country => country.name === target_country
        );
        return <FormattedCountry input_country={FilteredCountries[0]} />;
    } else {
        return <div>{entries()}</div>;
    }
};

export default Countries;
