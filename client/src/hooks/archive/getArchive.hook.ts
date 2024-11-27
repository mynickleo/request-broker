import { useQuery } from "@tanstack/react-query"
import ArchiveService from "../../services/archive/Archive.service";

const useArchive = (page: number = 1, limit: number = 4) => {
    return useQuery({
        queryKey: ['archive', page, limit],
        queryFn: () => ArchiveService.getAll(page, limit).then((res) => res.data)
    });
}

export default useArchive;