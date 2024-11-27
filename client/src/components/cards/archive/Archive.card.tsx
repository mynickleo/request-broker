import { ArchiveStatusEnum } from "../../../shared/enums/archive-status.enum";
import { IArchive } from "../../../shared/interfaces/archive.interface";
import styles from "./Archive.card.module.css";

const ArchiveCard = (data : IArchive) => {
    const renderBody = () => {
        if (!data.body) return "N/A";
        return JSON.stringify(data.body, null, 2);
    };

    const renderQuery = () => {
        if (!data.query) return "N/A";
        return Array.from(data.query.entries())
            .map(([key, value]) => `${key}: ${value}`)
            .join(',');
    };

    return (
        <div className={styles.main}>
            <div className={styles.info}>
                <p><strong>URL:</strong> {data.url}</p>
                <p><strong>Method:</strong> {data.method}</p>

                <div className={styles.group}>
                    <p><strong>Body:</strong> {renderBody()}</p>
                    <p><strong>Query:</strong> {renderQuery()}</p>
                </div>

                <div className={styles.group}>
                    <p><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                    <p><strong>Updated:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
                </div>
            </div>

            <div className={data.status === ArchiveStatusEnum.success ? styles.statusSuccess : styles.statusFailed}>
                <p>{data.status.toLocaleUpperCase()}</p>
            </div>
        </div>
    )
}

export default ArchiveCard