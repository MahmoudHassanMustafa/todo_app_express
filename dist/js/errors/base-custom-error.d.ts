export declare class BaseCustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
