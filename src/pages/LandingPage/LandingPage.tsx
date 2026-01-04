import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Shield, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button/Button';
import { ROUTES } from '../../config/constants';
import styles from './LandingPage.module.css';

const FEATURES = [
  {
    icon: <FileText size={24} />,
    title: 'Multiple Document Types',
    description: 'Generate Plaints, Written Statements, Notices, and Affidavits',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure & Private',
    description: 'Your documents are encrypted and securely stored',
  },
  {
    icon: <Zap size={24} />,
    title: 'Fast Generation',
    description: 'Get professionally formatted documents in seconds',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>LegalDraft</div>
        <nav className={styles.nav}>
          <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)}>
            Sign In
          </Button>
          <Button onClick={() => navigate(ROUTES.REGISTER)}>Get Started</Button>
        </nav>
      </header>

      <main className={styles.main}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Professional Legal Document
            <span className={styles.titleAccent}> Generation</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Create legally sound documents with precision and ease. Designed for legal
            professionals who demand excellence.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => navigate(ROUTES.REGISTER)}
              rightIcon={<ArrowRight size={20} />}
            >
              Start Generating Documents
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.features}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} LegalDraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
