/**
 * Deep Merge Utility
 * 
 * Merges Supabase overrides over siteDefaults with the following rules:
 * - Scalars: Override wins if it is not null/undefined
 * - Arrays: Override wins entirely (admin manages full arrays)
 * - Objects: Recursively deep-merged so partial updates don't destroy sibling keys
 * - null/undefined from override: Falls back to default
 */

export function deepMerge<T extends Record<string, any>>(
    defaults: T,
    overrides: Partial<T> | null | undefined
): T {
    // If no overrides, return defaults as-is
    if (!overrides || typeof overrides !== 'object') {
        return defaults;
    }

    const result = { ...defaults };

    for (const key of Object.keys(overrides) as Array<keyof T>) {
        const overrideValue = overrides[key];
        const defaultValue = defaults[key];

        // Skip null/undefined overrides — keep the default
        if (overrideValue === null || overrideValue === undefined) {
            continue;
        }

        // Arrays: override replaces entirely (admin manages the full array)
        if (Array.isArray(overrideValue)) {
            result[key] = overrideValue as any;
            continue;
        }

        // Objects: recursively deep merge (but not arrays, which are handled above)
        if (
            typeof overrideValue === 'object' &&
            typeof defaultValue === 'object' &&
            defaultValue !== null &&
            !Array.isArray(defaultValue)
        ) {
            result[key] = deepMerge(defaultValue, overrideValue as any) as any;
            continue;
        }

        // Scalars: override wins
        result[key] = overrideValue as any;
    }

    return result;
}
