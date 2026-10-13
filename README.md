# Currency Converter Frontend

A sleek, intuitive, and modern web interface designed for currency conversion and conversion history management. Built purely with standard web technologies (**HTML5**, **CSS3**, and vanilla **JavaScript**).

---

## Overview & Key Features

- **Intuitive Currency Converter**:
  - Clean input fields for entering amounts with numeric validation.
  - Dropdown selectors for source and target currencies (`INR`, `USD`, `EUR`, `GBP`, `JPY`).
  - **One-Click Currency Swap (⇄)**: Instantly switches the source and destination currencies without reselecting.
- **Dynamic Conversion Result Display**:
  - Dedicated result card highlighting the converted value, source amount, and formatted currency labels.
- **Conversion History (CRUD Management)**:
  - Dynamically renders saved conversion cards beneath the converter.
  - Displays unique conversion tags (`CONVERSION #ID`), formatted amounts, and conversion direction.
  - **Inline Editing**: Allows users to quickly update conversion parameters directly from the UI.
  - **Deletion**: Easily removes past conversion records.
- **Modern UI & Aesthetic**:
  - Minimalist layout with card-based elevation, subtle borders, and smooth transitions.
  - Polished button interactions and focus states.
  - Fully responsive layout optimized for mobile screens, tablets, and desktops.
- **Zero Build Step / Lightweight**:
  - Pure vanilla implementation with no framework dependencies, bundlers, or heavy node packages.

---

##  Frontend Architecture & Technologies

- **HTML5 (`index.html`)**: Semantic markup providing the core document structure, headers, form controls, and accessible tags.
- **CSS3 (`cs/style.css`)**: Custom styling incorporating responsive layout techniques (Flexbox & Grid), polished component cards, custom select elements, and clean typography.
- **JavaScript ES6+ (`js/script.js`)**: Handles client-side interactivity, input validation, DOM rendering, history component generation, and asynchronous communication via the Fetch API.

---

##  File Structure

```text
frontend/
├── index.html        # Main landing page and converter interface
├── cs/
│   └── style.css     # Stylesheet for themes, layout, typography, and animations
├── js/
│   └── script.js     # Client logic, UI interactions, and history management
└── README.md         # Frontend overview and documentation
```

---

## 🖥️ UI Components & Sections

1. **Header & Branding**: Top navigation bar featuring the **Exchange.** branding and application label.
2. **Intro Section**: Hero heading and introductory tagline.
3. **Converter Card**:
   - Amount input field.
   - Dual currency selectors with intermediate quick-swap button (`⇄`).
   - Primary action button (`Convert currency →`).
   - Dynamic conversion output container.
4. **History Section**:
   - Asynchronously populated list of past conversions.
   - Action buttons for editing and deleting records.
5. **Footer**: Clean bottom signature and copyright banner.
