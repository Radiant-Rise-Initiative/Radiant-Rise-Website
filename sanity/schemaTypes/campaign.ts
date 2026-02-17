import { defineField, defineType } from 'sanity';

export const campaign = defineType({
    name: 'campaign',
    title: 'Campaign',
    type: 'document',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'targetAmount',
            title: 'Target Amount',
            type: 'number',
        }),
        defineField({
            name: 'currentAmount',
            title: 'Current Amount',
            type: 'number',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'Active' },
                    { title: 'Completed', value: 'Completed' },
                    { title: 'Emergency', value: 'Emergency' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'paymentLink',
            title: 'Payment Link',
            type: 'url',
        }),
    ],
});
