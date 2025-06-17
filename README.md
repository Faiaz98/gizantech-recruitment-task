# GizanTech Trainee Engineer (Web Dev) Recruitment Task - June 2025

## Overview
This is a full-stack temperature monitoring System built as part of the Trainee Engineer (Web Dev) Recruitment Assignment. It includes:

- A backend API that returns mock temperature data
- A frontend dashboard that visualizes temperature in real time
- Rate limiting (100 requests/second)
- Scalability tested for 1000+ concurrent users
- Clean UI with responsive design
- Optional enhancements: error handling, logging, visual improvements

---

## Tech Stack
| Layer       | Technology                    |
|-------------|-------------------------------|
| Backend     | Node.js, Express.js, morgan   |
| Frontend    | React (vite), Chart.js, Axios |
| Testing     | k6 (for performance tests)    |

---

---

## Development Steps & Decisions

### Initial Setup
- Set up the backend with Express to serve `/temperature` JSON
- Created a rate limiter middleware (100 req/sec)

### Frontend Setup
- Used Vite for fast React dev server
- Chart.js via react-chartjs-2 to draw real-time graph

### Real-Time Chart Decisions
- Updated every 1s via `setInterval`
- Replaced simple `1s, 2s` x-axis with real `timestamp` labels

### Style Enhancements
- Created a modern card layout using CSS
- Added animations and responsive behavior for mobile

### Problems Solved
- `k6` couldn't reach Vite at `localhost`
    **Fix**: Fixed with `server.host = '0.0.0.0'` in `vite.config.js`

- API initially returned only temperature
   **Fix**: Added `unit` and `timestamp` as required by PDF

- JWT auth was added but later removed
  **Update**: Chose to simplify for clarity as it wasn't required


---

## Performance Tests

###1. Rate Limit Test

```js
//k6-rate-limit.js
export const options = {
  vus: 150,
  duration: '1s',
}:
export default function() {
  http.get('http://localhost:5000/temperature');
}
```
**Result:** 100 requests succeeded (200), rest returned 429.

###2. Frontend Load Test (1000 Users)

```js
//k6-frontend-load.js
export const options = {
  vus: 1000,
  duration:'10s',
};

export default function () {
  http.get('http://localhost:5173');
}

```
**Result:** All requests returned 200, no degradation.

## Backend API

### Endpoint
`GET /temperature`

### Response

```json
{
  "temperature": 31.3,
  "unit": "Celsius",
  "timestamp": "2025-06-17T13:27:57.813Z"
}

```

### Error Handling
- 404 for invalid routes
- 500 for server errors
- All errors returned as JSON

### Logging
- Used `morgan` to log incoming requests

## Frontend Dashboard

### Features

- Live-updating chart (60s rolling window)
- Gradient-filled line under the graph
- Timestamps on x-axis
- Responsive and animated design
- Tooltip on hover to show temperature values


## How to Run
###Backend

```
cd backend/temperature-api
npm install
npm run dev
```

###Frontend

```
cd frontend
npm install
npm run dev
```
