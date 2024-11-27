import { useQueryClient } from "@tanstack/react-query";
import ArchiveCard from "../../components/cards/archive/Archive.card";
import useArchive from "../../hooks/archive/getArchive.hook";
import ArchiveService from "../../services/archive/Archive.service";
import { IArchive } from "../../shared/interfaces/archive.interface";
import styles from "./Archive.module.css";
import { useEffect, useState } from "react";

const Archive = () => {
    const textHeader = `Broker's Archive`;
    const [headerText, setHeaderText] = useState(`...`);
    const [page, setPage] = useState(1);
    const limit = 4;

    const queryClient = useQueryClient();

    const { data, isLoading } = useArchive(page, limit);

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
        }, 100);

        return () => clearInterval(interval);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const clearArchive = async () => {
        await ArchiveService.deleteAll();
        queryClient.invalidateQueries({
            queryKey: ['archive', page, limit],
        });
    };

    useEffect(() => {
        setAnimationHeader();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.main}>
            <h1>{headerText}</h1>

            <div className={styles.content}>
                {!isLoading && data && data.length > 0 ? (
                    data.map((queue: IArchive) => <ArchiveCard key={queue.id} {...queue} />)
                ) : (
                    <h3>The archive is empty...</h3>
                )}
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
                    onClick={clearArchive}
                    disabled={isLoading}
                >
                    Clear
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
};

export default Archive;