//regex found from emailregex.com
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length && !re.test(email));
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
};
