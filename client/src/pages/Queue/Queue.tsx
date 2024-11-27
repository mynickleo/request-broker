import styles from './Queue.module.css'
import { useEffect, useState } from 'react';
import QueueCard from '../../components/cards/queue/Queue.card';
import useQueue from '../../hooks/queue/getQueue.hook';
import { IQueue } from '../../shared/interfaces/queue.interface';

const Queue = () => {
    const textHeader = `Broker's Queue`;
    const [headerText, setHeaderText] = useState(`...`);

    const [page, setPage] = useState(1);
    const limit = 4;

    const { data, isLoading } = useQueue(page, limit);


    const setAnimationHeader = () => {
        let currentText = ``;
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentText += textHeader[currentIndex];
            setHeaderText(currentText);
            currentIndex += 1;

            if (currentIndex === textHeader.length) {
                clearInterval(interval);
            }
        }, 100)

        return () => clearInterval(interval)
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    useEffect(() => {
        setAnimationHeader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.main}>
            <h1>{headerText}</h1>

            <div className={styles.content}>
                {!isLoading &&
                    data &&
                    data.length > 0 ? data.map((queue: IQueue) => (
                        <QueueCard key={queue.id} {...queue} />
                    )) : <h3>The queue is empty...</h3>}
            </div>

            <div className={styles.pagination}>
                <button
                    className={styles.button}
                    onClick={handlePrevPage}
                    disabled={page === 1 || isLoading}
                >
                    Previous
                </button>
                <button
                    className={styles.button}
                    onClick={handleNextPage}
                    disabled={isLoading || (data && data.length < limit)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Queue