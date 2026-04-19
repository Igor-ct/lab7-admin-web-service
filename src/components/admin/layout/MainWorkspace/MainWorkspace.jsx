import styles from './MainWorkspace.module.css';

function MainWorkspace({ children }) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}

export default MainWorkspace;