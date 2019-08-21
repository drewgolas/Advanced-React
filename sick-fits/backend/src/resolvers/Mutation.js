const Mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO check login
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },

    async updateItem(parent, args, ctx, info) {
        //first take copy of updates
        const updates = {...args};
        // remove ID
        delete updates.id;
        // run updates
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },

    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id }
        // find the item
        const item = ctx.db.query.item({where}, `{id title}`);
        // check if owned/permissed
        // TODO
        // delete it
        return ctx.db.mutation.deleteItem({where}, info);

    }
};

module.exports = Mutations;
