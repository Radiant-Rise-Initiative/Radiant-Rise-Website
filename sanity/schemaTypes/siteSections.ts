import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSections',
    title: 'Site Sections',
    type: 'document',
    fields: [
        defineField({
            name: 'internalTitle',
            title: 'Internal Reference Title',
            type: 'string',
            description: 'Name this document (e.g., "Main Website Content").',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroSection',
            title: 'Hero Section',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            fields: [
                defineField({ name: 'headline', title: 'Headline', type: 'string' }),
                defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
                defineField({ name: 'heroImage', title: 'Background / Hero Image', type: 'image', options: { hotspot: true } }),
            ]
        }),
        defineField({
            name: 'aboutSection',
            title: 'About Section',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'title', title: 'Section Title', type: 'string' }),
                defineField({ name: 'content', title: 'Content', type: 'text' }),
                defineField({ name: 'image', title: 'About Image', type: 'image', options: { hotspot: true } }),
            ]
        }),
        defineField({
            name: 'valuesSection',
            title: 'Our Values Section',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                defineField({ name: 'title', title: 'Section Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
            ]
        }),
    ],
    preview: {
        select: {
            title: 'internalTitle',
        },
    },
})
