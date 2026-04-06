import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'newsletter',
    title: 'Newsletter Release',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Newsletter Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'releaseDate',
            title: 'Release Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'author',
            title: 'Author(s)',
            type: 'string',
            description: 'Provide an author name (optional). Will be displayed under details.',
        }),
        defineField({
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            description: 'Link to an external resource or full article (optional).',
        }),
        defineField({
            name: 'body',
            title: 'Newsletter Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ],
            description: 'The main textual content of the newsletter.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'releaseDate',
            media: 'coverImage',
        },
        prepare(selection) {
            const { title, date, media } = selection
            return {
                title,
                subtitle: date,
                media,
            }
        },
    },
})
