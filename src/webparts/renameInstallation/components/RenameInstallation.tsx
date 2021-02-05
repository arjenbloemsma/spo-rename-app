import * as React from 'react'
import styles from './RenameInstallation.module.scss'
import { IRenameInstallationProps } from './IRenameInstallationProps'
import { escape } from '@microsoft/sp-lodash-subset'
import SiteTitleEditor from './SiteTitleEditor'

const RenameInstallation: React.FC<IRenameInstallationProps> = ({
  description,
}) => (
  <div className={styles.renameInstallation}>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.title}>Rename a site</span>
          <p className={styles.subTitle}>Rename one or more sites.</p>
          <p className={styles.description}>{escape(description)}</p>
          <SiteTitleEditor />
        </div>
      </div>
    </div>
  </div>
)

export default RenameInstallation
