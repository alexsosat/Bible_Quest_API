'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

/*
 const id = ctx.params.id;
        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch({ columns: ['username', 'biography'] }) // here we wait for one column only
        ctx.send(result);
*/

module.exports = {
    stats: async ctx => {
        const id = ctx.params.id;
        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch()
        const fields = result.toJSON();

        ctx.send(fields['stats']);
    },

    info: async ctx => {
        const id = ctx.params.id;
        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch()
        const fields = result.toJSON();

        ctx.send(
            `{"username":"${fields["username"]}","biography":"${fields["biography"]}","current_items":${JSON.stringify(fields["current_items"])}}`
        );
    },
    readed: async ctx => {
        const id = ctx.params.id;
        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch({ columns: ['books_readed'] }) // here we wait for one column only
        ctx.send(result);
    },
    itemsType: async ctx => {
        const id = ctx.params.id;
        const type = ctx.params.type;

        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch()
        const fields = result.toJSON();

        let items = fields['items']

        items = items.filter(x => x.type === type);

        ctx.send(items);
    },
    items: async ctx => {
        const id = ctx.params.id;
        const type = ctx.params.type;

        const result = await strapi
            .query('Users')
            .model.query(qb => {
                qb.where('id', id);
            }).fetch()
        const fields = result.toJSON();

        ctx.send(fields['items']);
    }
}
