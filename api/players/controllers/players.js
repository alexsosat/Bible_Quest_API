'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

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
    exists: async ctx => {
        const key = ctx.params.key;
        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()

        if (result != null) {
            ctx.send(true);
        }
        else {
            ctx.send(false);
        }
    },
    findKey: async ctx => {
        const key = ctx.params.key;
        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()

        ctx.send(result);
    },
    stats: async ctx => {
        const key = ctx.params.key;
        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        const fields = result.toJSON();

        ctx.send(fields['stats']);
    },

    info: async ctx => {
        const key = ctx.params.key;
        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        const fields = result.toJSON();

        const plainText = `{"id":"${fields["id"]}","username":"${fields["username"]}","current_items":${JSON.stringify(fields["current_items"])}}`

        ctx.send(JSON.parse(plainText));
    },
    readed: async ctx => {
        const key = ctx.params.key;
        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch() // here we wait for one column only

        const fields = result.toJSON();

        ctx.send(fields['current_readings']);
    },
    itemsType: async ctx => {
        const key = ctx.params.key;
        const type = ctx.params.type;

        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        const fields = result.toJSON();

        let items = fields['items']

        items = items.filter(x => x.type === type);

        ctx.send(items);
    },
    items: async ctx => {
        const key = ctx.params.key;
        const type = ctx.params.type;

        const result = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        const fields = result.toJSON();

        ctx.send(fields['items']);
    },
    updateStats: async ctx => {
        const key = ctx.params.key;
        const model = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        let fields = model.toJSON();
        const id = fields["id"];



        let entity;
        const data = ctx.request.body;

        fields["stats"] = data;

        entity = await strapi.services.players.update({ id }, fields);


        return sanitizeEntity(entity, { model: strapi.models.players });
    },
    updateUsername: async ctx => {
        const key = ctx.params.key;
        const model = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        let fields = model.toJSON();
        const id = fields["id"];

        let entity;
        const data = ctx.request.body;

        fields["username"] = data["username"];


        // ctx.send(fields);
        entity = await strapi.services.players.update({ id }, fields);


        return sanitizeEntity(entity, { model: strapi.models.players });
    },
    updateCurrentItems: async ctx => {
        const key = ctx.params.key;
        const model = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        let fields = model.toJSON();
        const id = fields["id"];

        let entity;
        const data = ctx.request.body;

        fields["current_items"] = data["current_items"];


        // ctx.send(fields);
        entity = await strapi.services.players.update({ id }, fields);


        return sanitizeEntity(entity, { model: strapi.models.players });
    },
    updateReaded: async ctx => {
        const key = ctx.params.key;
        const model = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        let fields = model.toJSON();
        const id = fields["id"];

        let entity;
        const data = ctx.request.body;

        fields["current_readings"] = data;


        // ctx.send(fields);
        entity = await strapi.services.players.update({ id }, fields);


        return sanitizeEntity(entity, { model: strapi.models.players });
    },
    updateItems: async ctx => {
        const key = ctx.params.key;
        const model = await strapi
            .query('Players')
            .model.query(qb => {
                qb.where('key', key);
            }).fetch()
        let fields = model.toJSON();
        const id = fields["id"];

        let entity;
        const data = ctx.request.body;

        fields["items"] = data;


        // ctx.send(fields);
        entity = await strapi.services.players.update({ id }, fields);


        return sanitizeEntity(entity, { model: strapi.models.players });
    },
};
