import { groq } from 'next-sanity'

// Query to get all newsletter releases, ordered by release date
export const newslettersQuery = groq`
  *[_type == "newsletter"] | order(releaseDate desc) {
    _id,
    title,
    releaseDate,
    coverImage,
    author,
    externalLink,
    body
  }
`

// Query to get the single siteSections settings document
export const siteSectionsQuery = groq`
  *[_type == "siteSections"][0] {
    internalTitle,
    heroSection,
    aboutSection,
    valuesSection
  }
`
