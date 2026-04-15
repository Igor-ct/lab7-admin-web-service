# Warehouse Inventory Admin Panel

**University Laboratory Work #7**

## Project Goal

The goal of this project is to make a part of a web application for managing warehouse inventory. This application will let the administrator do things like view create, edit and delete inventory items using a REST API. The warehouse inventory admin panel is the focus of this project.

## Status

- **[COMPLETE]** feat/base-design
  - Sidebar
  - Header
  - Main Workspace (Dashboard)

- **[Complete]** feat/setup-pages
  - base routing
  - 404 page for unknown routes
  - stub pages

- **[Complete]** feat/inventory-table
  - add basic search by name, id, sku
  - add sorting (asc/desc) by name, id, sku, price, stock
  - add advanced filtering by status and price range (min/max)

- **[Complete]** feat/inventory-crud
  - implemented full CRUD system for inventory management
  - designed and built UI for create, read, update, and edit pages
  - integrated frontend with custom backend API
  - handled validation and edge cases

##  Tech Stack

* **Frontend:** React 18+
* **Build Tool:** Vite
* **Routing:** React Router DOM v6+
* **State Management:** React Context + Hooks (`useState`, `useContext`)
* **API Calls:** Fetch API
* **Styling:** CSS Modules

## Core Features (CRUD)

* **Read:** View a table of all inventory items (name, description, photo preview, actions) and a separate details page (`/inventory/:id`).
* **Create:** Add a new item with field validation and image upload support (`multipart/form-data`).
* **Update:** Edit existing items. Implemented via two independent endpoints:
  * Text data update (JSON).
  * Photo update (`multipart/form-data`).
* **Delete:** Remove an item with a mandatory Confirm Modal.
* **UX/UI:** Handling of `loading`, `empty state`, and `error state`.

## Running Locally

To run the warehouse inventory admin panel locally follow these steps:

1. Clone the repository using the following command:

```bash
git clone git@github.com:your-username/repository-name.git
```

2. Navigate to the project folder:

```bash
cd repository-name
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Start the backend server:
```bash
cd admin-backend
node server.js
```

## Project Structure

```
/src
├── components
│   ├── Layout
│   │   ├── Header
│   │   ├── MainWorkspace
│   │   └── Sidebar
│   ├── inventory 
│   │   ├── InventoryTable
│   │   ├── InventoryForm
│   │   ├── InventoryEdit
│   │   ├── InventoryDetails
│   │   └── ConfirmModal
├── pages 
│   ├── AdminInventory
│   ├── AdminInventoryCreate
│   ├── AdminInventoryEdit
│   ├── AdminInventoryDetails
│   ├── NotFound
│   └── Dashboard
├── services 
│   └── inventoryApi.js
├── store 
│   └── InventoryContext.jsx
├── App.jsx
└── main.jsx
```