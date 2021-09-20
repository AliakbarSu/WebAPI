"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gqlFieldAuthChecker = ({ root, args, context, info }, roles) => {
    if (!roles.length) {
        return true;
    }
    const owner = roles.find(role => role.toLowerCase() === 'owner');
    if (owner) {
        if (!context.req.user || !root._id) {
            return false;
        }
        return String(root._id) === String(context.req.user._id);
    }
    return true;
};
//# sourceMappingURL=gqlFieldAuthChecker.js.map