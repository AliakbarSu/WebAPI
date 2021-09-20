import { AuthChecker } from 'type-graphql';

export const gqlFieldAuthChecker: AuthChecker<any> = (
    { root, args, context, info }, roles,
    ) => {
        // here we can read the user from context
        // and check his permission in the db against the `roles` argument
        // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
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
        return true; // or false if access is denied
};
