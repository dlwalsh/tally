import slugify from "slugify";

export function slug(str) {
  return slugify(str, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
}
