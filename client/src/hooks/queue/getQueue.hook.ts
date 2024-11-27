import { useQuery } from "@tanstack/react-query"
import QueueService from "../../services/queue/Queue.service"

const useQueue = (page: number = 1, limit: number = 4) => {
    return useQuery({
        queryKey: ['queue', page, limit],
        queryFn: () => QueueService.getAll(page, limit).then((res) => res.data),
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });
}

export default useQueue;