'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    list: async ctx => {
        // const result = await strapi
        //     .query('Banners')
        //     .model.fetchAll({ columns: ['id', 'title', 'startDate', 'endDate'] })
        // const fields = result.toJSON();

        // ctx.send(fields);
        let entities;
        entities = await strapi.services.banners.find("");

        return entities.map(entity => {
            const banner = sanitizeEntity(entity, {
                model: strapi.models.banners,
            });

            delete banner.items;
            delete banner.published_at;
            delete banner.created_at;
            delete banner.updated_at;
            delete banner.cost;
            delete banner.description;

            return banner;
        });
    },
};
