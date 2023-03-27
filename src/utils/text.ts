export const sanitizeHTMLTags = (text: string): string => {
  return text.replaceAll(/<[^>]*>?/gm, "");
};
