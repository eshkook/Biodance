// # Password minimum length
// # 8 character(s)
// # Password requirements
// # Contains at least 1 number
// # Contains at least 1 special character
// # Contains at least 1 uppercase letter
// # Contains at least 1 lowercase letter
// # Temporary passwords set by administrators expire in
// # 7 day(s)

export function isValidPassword(password) {
    const minLength = 8;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;

    if (password.length < minLength) {
        return false;
    }
    if (!hasNumber.test(password)) {
        return false;
    }
    if (!hasSpecialChar.test(password)) {
        return false;
    }
    if (!hasUpperCase.test(password)) {
        return false;
    }
    if (!hasLowerCase.test(password)) {
        return false;
    }
    return true;
}

export function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}