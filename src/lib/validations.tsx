export const isRequired = (value: string): string => {
  return value.length > 0 ? '' : 'این فیلد اجباری است.';
};
