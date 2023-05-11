import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesGuard } from "../roles.guard";

//@authedGuards decorator, contains jwt and roles guard
export function authedGuards(...guards: any[]) {
    return applyDecorators(
        UseGuards(AuthGuard('jwt'), RolesGuard, ...guards),
        ApiBearerAuth(),
    );
}

//@jwtGuard decorator, contains jwt guard
export function jwtGuard(...guards: any[]) {
    return applyDecorators(
        UseGuards(AuthGuard('jwt'), ...guards),
    );
}

//@noGuards decorator, contains no guards
export function noGuards() {
    return applyDecorators(
       
    );
}

export default {authedGuards, jwtGuard, noGuards};