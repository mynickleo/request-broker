import axios from "axios";
import { IQueue } from "../../shared/interfaces/queue.interface";

class QueueService {
    #URL = 'http://localhost:3000/api/queue'

    async getAll(page: number = 1, limit: number = 4): Promise<{ data: IQueue[] }> {
        const response = await axios.get(`${this.#URL}/?page=${page}&limit=${limit}`);
        return response.data;
    }
}

export default new QueueService();