import { WatcherRole } from "src/constants/enum";

export class WatcherSignUpDto {
    email: string;
    phone: string;
    watcherName: string;
    watcherSurname: string;
    password:string;
    role: WatcherRole;
}