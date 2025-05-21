import axios from "axios";

export function prepareErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return (
            error.response?.data?.message ??
            error.message ??
            "Unknown error"
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error";
}
