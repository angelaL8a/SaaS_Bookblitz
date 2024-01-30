// https://www.npmjs.com/package/slug
// https://www.npmjs.com/package/@paralleldrive/cuid2

import slug from "slug";
import { init } from "@paralleldrive/cuid2";
import { db } from "../db/index.js";

export const generateRandomUsername = async (
  companyId,
  firstName,
  lastName
) => {
  const company = await db.company.findUnique({ where: { id: companyId } });
  if (!company) return;

  const firstNameNoSpaces = firstName.replace(/\s/g, "");
  const lastNameNoSpaces = lastName.replace(/\s/g, "");

  const username =
    slug(firstNameNoSpaces.slice(0, 3), "-") +
    slug(lastNameNoSpaces.slice(0, 3), "-");

  const usernameId = init({
    length: 8,
  });

  return username + usernameId() + company.url;
};
