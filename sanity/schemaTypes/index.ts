import { type SchemaTypeDefinition } from 'sanity';
import { impactStory } from './impactStory';
import { campaign } from './campaign';
import newsletter from './newsletter';
import siteSections from './siteSections';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [impactStory, campaign, newsletter, siteSections],
};
