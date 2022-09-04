export function getDefaultForType(type) {
  switch (type) {
    case 'Number':
      return 0;
    case 'Boolean':
      return 'true';
    default:
      return '{}';
  }
}
