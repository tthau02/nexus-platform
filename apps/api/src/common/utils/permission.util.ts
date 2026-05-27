export interface PermissionDefinition {
  name: string;
  displayName: string;
  parentName: string | null;
  level: number;
}

/**
 * Automatically parses nested permission definitions and builds flat PermissionDefinition objects.
 * Calculates parentName and level dynamically from the dotted string name.
 */
export function buildPermissionDefinitions(
  permissionsObj: any,
  displayNames: Record<string, string>,
): PermissionDefinition[] {
  const names: string[] = [];

  const recurse = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        names.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        recurse(obj[key]);
      }
    }
  };

  recurse(permissionsObj);

  // Remove duplicates just in case
  const uniqueNames = Array.from(new Set(names));

  return uniqueNames.map((name) => {
    const parts = name.split('.');
    
    let parentName: string | null = null;
    let level = 0;

    if (parts.length > 2) {
      // e.g., 'Pages.Administration.Users' -> parent is 'Pages.Administration'
      parentName = parts.slice(0, parts.length - 1).join('.');
      level = parts.length - 2;
    } else if (parts.length === 2) {
      // e.g., 'Pages.Products' -> parent is null, level is 0
      parentName = null;
      level = 0;
    } else {
      // e.g., 'Pages' -> parent is null, level is 0
      parentName = null;
      level = 0;
    }

    const displayName = displayNames[name] || parts[parts.length - 1];

    return {
      name,
      displayName,
      parentName,
      level,
    };
  });
}
