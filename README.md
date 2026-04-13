# Warehouse Inventory Admin Panel

**University Laboratory Work #7**

## Project Goal

The goal of this project is to make a part of a web application for managing warehouse inventory. This application will let the administrator do things like view create, edit and delete inventory items using a REST API. The warehouse inventory admin panel is the focus of this project.

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

## Project Structure

```

/src
├── components
│   ├── inventory
│   │   ├── InventoryTable.jsx
│   │   ├── InventoryForm.jsx
│   │   ├── InventoryDetails.jsx
│   │   └── ConfirmModal.jsx
├── pages
│   ├── AdminInventory.jsx
│   ├── AdminInventoryCreate.jsx
│   ├── AdminInventoryEdit.jsx
│   └── AdminInventoryDetails.jsx
├── services
│   └── inventoryApi.js
├── store
│   └── (context)
├── App.jsx
└── main.jsx
```