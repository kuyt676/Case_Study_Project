# Case_Study_Project

This repository contains two main projects:

- **ip-intel-bff**: Node.js/Express backend that aggregates IP threat intelligence from external APIs.
- **ip-threat-client**: React + TypeScript frontend for querying and displaying IP threat data.

---

## Project Structure

```
.
├── ip-intel-bff/         # Backend (Node.js/Express)
├── ip-threat-client/     # Frontend (React + Vite + Tailwind)
```

---

## 1️⃣ Backend: ip-intel-bff

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
   See [Guidance on API key configuration](#2-guidance-on-api-key-configuration).

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

## 2️⃣ Guidance on API key configuration

Both backend and frontend may require API keys for external services.

### Backend (`ip-intel-bff`)

1. **Create a `.env` file** in the `ip-intel-bff` directory:
   ```
   ABUSEIPDB_API_KEY=your_abuseipdb_api_key
   IPQUALITYSCORE_API_KEY=your_ipqualityscore_api_key
   ```

2. **Obtain API keys:**
   - [AbuseIPDB](https://www.abuseipdb.com/) – Sign up and generate an API key.
   - [IPQualityScore](https://www.ipqualityscore.com/) – Sign up and generate an API key.

3. **Never commit your `.env` file or API keys to version control.**

### Frontend (`ip-threat-client`)

- By default, the frontend does **not** require API keys if it only communicates with the backend.
- If you add direct API calls from the frontend, use Vite environment variables (e.g., `.env` files) and never expose sensitive keys in the client code.

---

## 3️⃣ Frontend: ip-threat-client

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
