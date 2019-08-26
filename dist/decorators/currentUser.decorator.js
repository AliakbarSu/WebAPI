"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.CurrentUser = common_1.createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);
//# sourceMappingURL=currentUser.decorator.js.map