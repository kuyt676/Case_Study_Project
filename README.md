# Case Study Project: IP Threat Intelligence

This repository contains two main projects:

- **[ip-intel-bff](ip-intel-bff/):** Node.js/Express backend that aggregates IP threat intelligence from external APIs.
- **[ip-threat-client](ip-threat-client/):** React + TypeScript frontend for querying and displaying IP threat data.

---

## Project Structure

```
.
├── ip-intel-bff/         # Backend (Node.js/Express)
│   ├── src/
│   ├── tests/
│   ├── .env
│   ├── package.json
│   └── ...
└── ip-threat-client/     # Frontend (React + Vite + Tailwind)
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

---

## Backend: [ip-intel-bff](ip-intel-bff/)

### Features

- Aggregates data from AbuseIPDB and IPQualityScore.
- Provides a single `/api/intel?ip=...` endpoint.
- Calculates a risk level based on threat data.

### Setup

1. **Install dependencies:**
   ```sh
   cd ip-intel-bff
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` and set your API keys for AbuseIPDB and IPQualityScore.

3. **Run in development:**
   ```sh
   npm run dev
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

### API Endpoint

- `GET /api/intel?ip=<ip-address>`
  - Returns threat intelligence and risk level for the given IP.

---

## Frontend: [ip-threat-client](ip-threat-client/)

### Features

- User-friendly interface to check IP threat intelligence.
- Displays abuse score, fraud score, VPN/proxy status, ISP, country, and risk level.
- Keeps a history of recent searches.
- Built with React, Vite, and Tailwind CSS.

### Setup

1. **Install dependencies:**
   ```sh
   cd ip-threat-client
   npm install
   ```

2. **Run in development:**
   ```sh
   npm run dev
   ```

3. **Run tests:**
   ```sh
   npm test
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

### Usage

- Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
- Enter an IP address to check its threat intelligence.

---

## Notes

- Ensure the backend (`ip-intel-bff`) is running on port 3000 before using the frontend.
- The frontend expects the backend API at `http://localhost:3000/api/intel`.

---

## License

This project is for educational purposes.
