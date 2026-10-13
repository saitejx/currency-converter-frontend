# Currency Converter Frontend

A clean, modern, and responsive web user interface for real-time currency conversion and conversion history management. Built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**.

---

##  Features

- **Interactive Currency Conversion**: Convert amounts between multiple fiat currencies (`INR`, `USD`, `EUR`, `GBP`, `JPY`).
- **Quick Currency Swap (⇄)**: Toggle between `from` and `to` currencies with a single click.
- **Conversion History Management (CRUD)**:
  - Automatically loads and displays previous conversions.
  - **Edit Record**: Modify amounts or currency choices directly in the UI.
  - **Delete Record**: Remove unwanted conversion records.
- **Responsive & Modern Design**: Clean typography, elegant card layout, smooth interactive states, and mobile responsiveness.
- **Pure Vanilla Stack**: Zero external JavaScript frameworks or heavy bundles; fast loading and lightweight.

---

##  Tech Stack

- **Markup**: HTML5 Semantic Elements
- **Styling**: Vanilla CSS3 (`cs/style.css`)
- **Scripting / Logic**: Vanilla JavaScript ES6+ (`js/script.js`)
- **Backend API**: Connects to the Spring Boot REST API (`http://localhost:8080/api/conversions`)

---

##  Project Structure

```text
frontend/
├── cs/
│   └── style.css       # Complete layout, themes, buttons, cards, and responsiveness
├── js/
│   └── script.js       # API calls, event handlers, DOM manipulation, CRUD operations
├── index.html          # Main application page
└── README.md           # Documentation for the frontend
```

---

##  Getting Started

### 1. Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).
- Ensure the **Backend** service is running on `http://localhost:8080` (refer to [Backend README](../backend/README.md) for startup instructions).

### 2. Running Locally

You do not need `npm` or build tools to run this frontend.

#### Option A: Direct Open in Browser
Double-click [`index.html`](file:///f:/TTproject/currency-converter/frontend/index.html) or right-click and choose **Open With > Google Chrome / Edge / Firefox**.

#### Option B: VS Code Live Server
1. Open the `frontend` folder in VS Code.
2. Right-click on [`index.html`](file:///f:/TTproject/currency-converter/frontend/index.html) and select **Open with Live Server**.
3. Access the app at `http://127.0.0.1:5500` (or the port specified by Live Server).

#### Option C: Python Simple HTTP Server
If you have Python installed:
```bash
cd currency-converter/frontend
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

#### Option D: Node `serve` / `http-server`
```bash
cd currency-converter/frontend
npx serve .
```

---

## Backend Configuration

The API URL is defined at the top of [`js/script.js`](file:///f:/TTproject/currency-converter/frontend/js/script.js):

```javascript
const API_URL = "http://localhost:8080/api/conversions";
```

### Deploying to Production:
If you deploy your backend to a cloud hosting platform (e.g. Render, Railway, AWS, Heroku), update `API_URL` to point to your live backend domain:

```javascript
const API_URL = "https://your-backend-domain.com/api/conversions";
```

---

## User Interface Workflow

1. **Enter Amount**: Type the numeric amount to convert.
2. **Select Currencies**: Pick the source currency (`From`) and target currency (`To`).
3. **Swap Button (⇄)**: Easily flip source and target currencies without re-selecting.
4. **Convert Currency (→)**: Submits the request to `POST /api/conversions/convert`, displays the result, and refreshes the history list.
5. **Manage History**:
   - Scroll through saved conversion entries.
   - Click **Edit** to adjust an existing record.
   - Click **Delete** to remove a record from the database.

---


