export abstract class ApiError extends Error {
    public abstract statusCode: number;
    public abstract message: string;
    public abstract code: string;
}