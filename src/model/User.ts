// import { Data, Lombok } from "node-boot-lombok";

// @Data()
export class User {
    [x: string]: any
    constructor() {
    }

    name: string = null;
    email: string = null;
    mobile: number = null;
}