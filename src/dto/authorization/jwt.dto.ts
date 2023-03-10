
export class JwtDataDto { 
    role: "administrator" | "user";
    Id: number; 
    identity: string;
    exp: number;
    ip: string;
    ua: string;

    toPlainObjectJWTdata() {
        return {
            role: this.role,
            Id: this.Id,
            username: this.identity,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua
        }
    }
}
