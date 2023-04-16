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

//@unauthedGuards decorator, contains jwt guard
export function unauthedGuards(...guards: any[]) {
    return applyDecorators(
        UseGuards(AuthGuard('jwt'), ...guards),
    );
}

//@noGuards decorator, contains no guards
export function noGuards() {
    return applyDecorators(
       
    );
}

export default {authedGuards, unauthedGuards, noGuards};