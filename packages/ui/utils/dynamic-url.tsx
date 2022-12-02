export const getDynamicURL = (
  base: string,
  fields: { name: string; value: string }[]
) => {
  let url = base;

  if (fields?.length > 0) {
    url = url + "?";

    const paramsString = fields
      ?.map((field) => {
        return `${field.name}=${encodeURIComponent(field.value)}`;
      })
      .join("&");

    url = url + paramsString;
  }

  return url;
};
