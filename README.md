# 🌦️ Weather App

A sleek, modern weather application that showcases real-time weather data with dynamic visual feedback and a user-focused feature set.

## 🔍 Features

- **Get Local Weather:** Fetches current weather using your geolocation and displays it with a relevant weather icon.
- **Smart Location Search:** Search by city name or latitude/longitude; the app intelligently resolves the location using an API.
- **Real-Time Clock:** Displays the correct local time of the searched location, fetched and updated live.
- **Dynamic Backgrounds:** Gradient background shifts depending on the **actual time (morning, evening, night)** of the location searched.
- **Current Weather Stats:**
  - Temperature (current, high, low)
  - Feels like
  - Precipitation probability
  - Wind speed with **animated wind flag**
- **24-Hour Forecast:** Displays hourly weather using a document fragment for optimal rendering.
- **15-Day Forecast:** Shows weather trends across days with icons and data clarity.
- **Night Mode Tweaks:** Slight contrast/opacity changes for better readability in low-light conditions.
- **Optimized API Calls:** Efficient handling using `async/await` to reduce API overhead and improve performance.
- **Responsive Design:** Works flawlessly across devices with consistent UX.
- **Footer:** Links to socials and deploy year — clean, professional finish.


---

### 🖼️ Preview

## 📸 Project Preview

![App Preview](./assets/screenshot.png)


## 🚀 Tech Stack

- HTML, CSS, JavaScript
- ES6 Modules
- Fetch API (`async/await`)
- OpenWeatherMap & Geolocation APIs

## 📍 Live Demo

👉 [Try the App](https://44ry4n.github.io/weather-app/)

---

![Live](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)                                        
![Made with](https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=for-the-badge)                                      
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)                                           


---

## 📁 Project Structure

```plaintext
weather-app/                                                                                    
│                                   
├── src/
│   └── styles.css                                      
│   └── template.html                               
│   └── getCity.js                      
│   └── getFifteen.js                               
│   └── getIconURL.js                               
│   └── getLocation.js                          
│   └── getTime.js                                  
│   └── getToday.js                             
│   └── handleFifteenUI.js                          
│   └── handleHourlyUI.js                               
│   └── handleLocation.js                                   
│   └── handleSearch.js                             
│   └── handleState.js                              
│   └── handleTabUI.js                                  
│   └── index.js                                            
│   └── updateBackground.js                             
│   └── updateFlag.js                           
│   └── img/                                
│                                   
├── .gitignore                                  
├──  README.md                              
├──  package-lock.json                                       
├──  package.json                               
├──  webpack.config.common.mjs                               
├──  webpack.config.dev.mjs                                             
├──  webpack.config.prod.mjs                                    
└── assets/screenshot.png                                   
```
--- 

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/44RY4N/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run start
    ```
4. Open in browser:
    ```bash
    http://localhost:8080
    ```
    ## 📚 Usage
    This is a simple weather app that displays the current weather and a 15-day forecast. It
    uses the OpenWeatherMap API to fetch weather data.
 

