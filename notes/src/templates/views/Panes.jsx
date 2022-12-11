import styles from '../../styles/components/panes.css';
import React from 'react';

const Manager = ({ children }) => (
    <div className={styles.panes}>
        {children}
    </div>
);

export default Manager;
