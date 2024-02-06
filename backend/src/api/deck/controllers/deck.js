'use strict';

/**
 * deck controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::deck.deck',
  ({ strapi }) => ({
    async findWithCards(ctx, next) {
      try {
        const a = await strapi.entityService.findMany('api::deck.deck', {
          populate: {
            cards: {
              fields: [
                'quantity',
                'boardtype'
              ],
              populate: ['card', 'card.image']
            }
          }
        });
        const b = a.map((item) => {
          const d = item.cards.reduce((obj, item) => {
            obj[item.card.id] = {
              ...item,
              card: item.card
            };
            return obj;
          }, {});
          return {
            ...item,
            cards: d
          }
        })
        return b;
      } catch (err) {
        console.log(err)
        ctx.body = err;
      }
    },
    async create(ctx, next) {
      try {
        const data = ctx.request.body.data

        const entry = await strapi.entityService.create('api::deck.deck', {
          data,
          populate: {
            cards: {
              fields: [
                'quantity',
                'boardtype'
              ],
              populate: ['card']
            }
          }
        });
        return entry
      } catch (err) {
        console.log(err)
        ctx.body = err;
      }
    }
  }),
)