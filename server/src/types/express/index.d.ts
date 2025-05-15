import {IUserTokenData} from "@/types/interfaces/UserInterfaces";

declare global {
    namespace Express {
        interface Request {
            user?: IUserTokenData;
        }
    }
}