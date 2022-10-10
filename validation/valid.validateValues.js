const vlaidateValues = (data, schema) => {
  const map = new Map(Object.entries(data));
  let required = new Map();

  for (const [key, value] of schema.entries()) {
    if (value.required) {
      required.set(key, value.required);
    }
  }

  for (const [key, value] of map.entries()) {
    if (!value.trim() && required.has(key)) return `${key} value is required.`
    if (value.length < 1 && required.has(key)) return `${key} must be at least 1 characters long`
    if (value.length > 1090) return `${key} must be no more than 1090 characters long`
  }
  return null;
};

module.exports = vlaidateValues;