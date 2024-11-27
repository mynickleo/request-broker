import axios from "axios";
import { IArchive } from "../../shared/interfaces/archive.interface";

class ArchiveService {
    #URL = 'http://localhost:3000/api/archive'

    async getAll(page: number = 1, limit: number = 4): Promise<{ data: IArchive[] }> {
        const response = await axios.get(`${this.#URL}/?page=${page}&limit=${limit}`);
        return response.data;
    }

    async deleteAll(): Promise<void> {
        await axios.delete(`${this.#URL}`);
    }
}

export default new ArchiveService();