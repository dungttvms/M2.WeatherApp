import React, { useState, useEffect } from 'react'
import "./App.css"

const api = {
    key: "0ed9c94d6a39029d8c121de7fbea1f17",
    base: "https://api.openweathermap.org/data/2.5/",
}


function App() {

    const [searchInput, setSearchInput] = useState("")
    const [searchCity, setSearchCity] =  useState("")
    const [weatherInfo, setWeatherInfo] =  useState("")
    const [loading, setLoading] =  useState(false)
    const [errorMessage, setErrorMessage] =  useState("")
    

    


    useEffect(() => {
      const fetchWeatherData = async () => {
        if (!searchCity) return;
        setLoading(true);
        //Process load data from api
        try {
            // Tạo đường dẫn hướng đến địa chỉ truy cập trên server
            const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`

            // Tạo biến response hứng dữ liệu từ api
            const response = await fetch(url);

            // Chuyển dữ liệu response thành response.json
            const data = await response.json();
            
            //
            if (response.ok) {
                // Hiển thị dữ liệu lên
                setWeatherInfo({
                  name: data.name,
                  country: data.sys.country,
                  temp: data.main.temp,
                  temp_max: data.main.temp_max,
                  temp_min: data.main.temp_min,
                  humidity: data.main.humidity
                });
                setErrorMessage("");
              } else {
                setErrorMessage(data.message)
              }

            

// Đề phòng các lỗi xảy ra, cần tạo function hứng lỗi và xử lý
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false);
      }
      fetchWeatherData();
    }, [searchCity])
    

    const handleSubmit= (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Please enter the city name" 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
        />
        <button>Search</button>
    </form>
    {loading ? (<div className="Information">Loading...</div>) : (
        <>
        {errorMessage ? (<div className="Information_error">{errorMessage}</div>
        ) : (
        <div className="Information">
    <p>Thành Phố: {weatherInfo.name}</p>
    <p>Quốc gia: {weatherInfo.country}</p>
    <p>Nhiệt độ hiện tại: {weatherInfo.temp}°C</p>
    <p>Nhiệt độ cao nhất: {weatherInfo.temp_max}°C</p>
    <p>Nhiệt độ thấp nhất: {weatherInfo.temp_min}°C</p>
    <p>Độ ẩm: {weatherInfo.humidity}%</p>

        </div>)}
        </>
    )}
    </>
  )
}

export default App