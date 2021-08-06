export class UnauthorizedException extends Error {

    constructor(public message: string){
        super();
    }
}