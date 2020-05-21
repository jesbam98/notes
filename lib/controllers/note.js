const Path = require('path');
const Slugify = require('slugify');
const Models = require('../models');

module.exports = {
    create: async (request, h) => {
        const note = await Models.Note
            .create({
                date: new Date(),
                title: request.payload.noteTitle,
                slug: Slugify(request.payload.noteTitle, { lower: true }),
                description: request.payload.noteDescription,
                content: request.payload.noteContent,
            });

        return { note };
    },
    read: async (request, h) => {
        const note = await Models.Note.findOne({
            where: { slug: request.params.slug },
        });

        return { note };
    },
    update: async (request, h) => {
        const values = {
            title: request.payload.noteTitle,
            description: request.payload.noteDescription,
            content: request.payload.noteContent,
        };

        const options = {
            where: { slug: request.params.slug },
        };

        await Models.Note.update(values, options);
        const note = await Models.Note.findOne(options);

        return { note };
    },
    delete: async (request, h) => {
        await Models.Note.destroy({ where: { slug: request.params.slug } });

        return h.redirect('/');
    },
}