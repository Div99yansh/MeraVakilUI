import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button/Button';
import styles from './Header.module.css';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1 className={styles.logo}>LegalDraft</h1>
      </div>

      <div className={styles.actions}>
        <div className={styles.userInfo}>
          <User size={18} />
          <span className={styles.email}>{user?.user_email_id}</span>
        </div>

        <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogOut size={16} />}>
          Logout
        </Button>
      </div>
    </header>
  );
}
