import { useState, useEffect } from 'react';
import styles from './MainWorkspace.module.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalProfit: 0,
    topItems: [],
    topClients: [],
  });

  useEffect(() => {
    const fetchDashboardData = () => {
      setStats({
        totalItems: 1245,
        totalProfit: 45800,
        topItems: [
          'Ноутбук Lenovo ThinkPad',
          'Монітор Dell 27"',
          'Клавіатура Keychron'
        ],
        topClients: [
          'ТОВ "Альфа-Тех"',
          'ФОП Коваленко',
          'ТОВ "МегаБуд"'
        ],
      });
    };

    fetchDashboardData();

    const intervalId = setInterval(fetchDashboardData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h2>Dashboard</h2>

      <div className={styles.dashboardGrid}>
        
        <div className={styles.statCard}>
          <h3>Total Items in Stock</h3>
          <div className={styles.statValue}>{stats.totalItems}</div>
        </div>

        <div className={styles.statCard}>
          <h3>Estimated Value</h3>
          <div className={styles.statValue}>${stats.totalProfit}</div>
        </div>

        <div className={styles.statCard}>
          <h3>Top Positions</h3>
          <ul className={styles.statList}>
            {stats.topItems.length === 0
              ? <li>Loading...</li>
              : stats.topItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
            }
          </ul>
        </div>

        <div className={styles.statCard}>
          <h3>Top Clients</h3>
          <ul className={styles.statList}>
            {stats.topClients.length === 0
              ? <li>Loading...</li>
              : stats.topClients.map((client, index) => (
                  <li key={index}>{client}</li>
                ))
            }
          </ul>
        </div>

      </div>
    </>
  );
}

export default Dashboard;