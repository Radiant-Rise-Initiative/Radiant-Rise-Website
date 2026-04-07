/**
 * Data Sanitization Failsafe
 * Handles image path inconsistencies and specifically broken paths used in legacy CMS data.
 */
export const s = (val: any): any => {
  if (typeof val !== 'string') return val;
  
  return val
    .replace(/Hero 06\.jpg/g, 'hero_006.jpg')
    // Remove invisible whitespace characters
    .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, ' ')
    .trim();
};
