import styles from './App.module.css';

function App() {
  return (
    <div className={styles.adminLayout}>
      {/* Head */}
      <header className={styles.header}>
        <h1>Warehouse Admin Panel</h1>
        <div className={styles.userInfo}>Admin</div>
      </header>

      <div className={styles.mainContainer}>
        {/* Nav */}
        <aside className={styles.sidebar}>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}> Inventory</li>
              <li className={styles.navItem}> Add New Item</li>
            </ul>
          </nav>
        </aside>

        {/* Main workplace */}
        <main className={styles.content}>
          <h2>Inventory Management</h2>
          <p>Тут скоро буде таблиця інвентарю...</p>
          
          {/* <InventoryTable /> */}
        </main>
      </div>
    </div>
  );
}

export default App;