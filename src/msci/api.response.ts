
export class ApiResponse {
    status: string;
    errorStatus: number;
    message: string | null;

    constructor(status: string, err: number, m: string | null) {
        this.status = status;
        this.errorStatus = err;
        this.message = m;
    }
}