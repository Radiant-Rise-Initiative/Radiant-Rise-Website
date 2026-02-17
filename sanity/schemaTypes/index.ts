import { type SchemaTypeDefinition } from 'sanity';
import { impactStory } from './impactStory';
import { campaign } from './campaign';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [impactStory, campaign],
};
