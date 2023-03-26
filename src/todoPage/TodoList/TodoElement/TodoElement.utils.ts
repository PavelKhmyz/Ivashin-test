export const editContent = (text: string) => {
  const regexToHtmltags = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/;
  const regexToSpaceOnEnd = /&\w+;/;
  const removeHtmlTags = text.split(regexToHtmltags).join(' ');
  const removeSpaceonEnd = removeHtmlTags.split(regexToSpaceOnEnd);
  return removeSpaceonEnd.join(' ');
};
