import { IQueue } from "../../../shared/interfaces/queue.interface";
import styles from "./Queue.card.module.css";

const QueueCard = (data : IQueue) => {
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
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>URL:</strong> {data.url}</p>
                <p><strong>Method:</strong> {data.method}</p>

                <div className={styles.group}>
                    <p><strong>Body:</strong> {renderBody()}</p>
                    <p><strong>Query:</strong> {renderQuery()}</p>
                </div>

                <div className={styles.group}>
                    <p><strong>Retry Count:</strong> {data.retryCount}</p>
                    <p><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                    <p><strong>Updated:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
                </div>
            </div>

            <div className={styles.status}>
                <p>{data.status.toLocaleUpperCase()}</p>
            </div>
        </div>
    )
}

export default QueueCard