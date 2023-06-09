import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { fetchCountry, fetchToken, fetchState, fetchCity } from "./API";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataCountry, setDataCountry] = useState([]);
  const [dataState, setDataState] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [newtoken, setNewtoken] = useState("");
  const REACT_APP_URI = process.env.REACT_APP_PROD === "PROD"? process.env.REACT_APP_WEATHER : process.env.REACT_APP_URI;
//  console.log("url nya ", REACT_APP_URI);
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        setLoading(true);
        fetchToken().then((res) => {  
          setNewtoken(res.auth_token);      
          fetchCountry(res.auth_token).then((res) => {
            if (res) {
              setDataCountry(res);
            } else {
              setDataCountry([]);
            }
          });
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCountries();
  }, []);

  const handleCountryChange = (value) => {
    try {
      setLoading(true);
      setDataState([]);
      // setLocation("");
      fetchState(value, newtoken).then((res) => {
        if (res) {
          setDataState(res);
        } else {
          setDataState([]);
        }
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStateChange = (value) => {
    try {
      setLoading(true);
      setDataCity([]);
      // setLocation("");
      fetchCity(value, newtoken).then((res) => {
        if (res) {
          setDataCity(res);
        } else {
          setDataCity([]);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCityChange = (value) => {
         console.log("isi city", value);

    try {      
      setLoading(true);

      var config = {
        method: "get",
        url: `${REACT_APP_URI}/Weather?city=${value}`,       
      };

      axios(config)
        .then(function (response) {
          console.log("asup ada", response.data);
          setData(response.data);
          //console.log(response.data.success);
        })
        .catch(function (error) {
          setData([]);
          console.log(error);
        });
      setLoading(false);
    } catch (err) {
      setData([]);
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <Select
          placeholder="Select country"
          onChange={handleCountryChange}
          loading={loading}
          style={{ width: "20%" }}
        >
          {dataCountry.map((data, index) => {
            return (
              <Select.Option key={index} value={data.country_name}>
                {data.country_name}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          placeholder="Select state"
          onChange={handleStateChange}
          loading={loading}
          style={{ width: "20%" }}
        >
          {dataState.map((data, index) => {
            return (
              <Select.Option key={index} value={data.state_name}>
                {data.state_name}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          placeholder="Select city"
          onChange={handleCityChange}
          loading={loading}
          style={{ width: "20%" }}
        >
          {dataCity.map((data, index) => {
            return (
              <Select.Option key={index} value={data.city_name}>
                {data.city_name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.sys.country} - {data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null}
          </div>
          <div className="temp">
            {data.main ? <h2>{
            // data.main.temp_celsius.toFixed()
            ((data.main.temp.toFixed() - 32) * 5 / 9).toFixed()
            }°C</h2> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          {data.message ? (
            <div className="feels">
              <p>{data.message}</p>
            </div>
          ) : null}

          <div className="feels">
            {data.main ? (
              <>
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                <p>Feels Like</p>
              </>
            ) : null}
          </div>
          <div className="humidity">
            {data.main ? (
              <>
                <p className="bold">{data.main.humidity}%</p>
                <p>Humidity</p>
              </>
            ) : null}
          </div>
          <div className="wind">
            {data.wind ? (
              <>
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                <p>Wind Speed</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
