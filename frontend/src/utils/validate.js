export function validate(key, value) {
  const regxId = /(?=.*\d)(?=.*[a-zA-ZS]).{6,}/;
  const regxPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const regxName = /([^\s]){1,20}/;
  const regxEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const regxPhone = /[0-9]{11,11}/;
  const regxBirthday = /[0-9]{8,8}/;

  switch (key) {
    case "id":
      return regxId.test(value);
    case "password":
      return regxPassword.test(value);
    case "name":
      if (value.trim().length >= 20) return false;
      return regxName.test(value);
    case "email":
      return regxEmail.test(value);
    case "phone":
      return regxPhone.test(value);
    case "birthday":
      return regxBirthday.test(value);

    default:
      return false;
  }
}
