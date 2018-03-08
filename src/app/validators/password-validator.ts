import { FormControl } from '@angular/forms';

/**
 * This regx checks for:
 * 1. Should have at least 1 Uppercase Character.
 * 2. Should have at least 1 Lowercase Character.
 * 3. Should have at least 1 Special Character.
 * 4. Should have at least 1 Number.
 * 5. Minimum length should be 10.
 * 6. Maximum length should be 128.
 */
const PASSWORD_REGX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[! @#$%^&*.():;~=+{}<>?-])(?=.{10,128})');

/**
 * This regx checks for:
 * Should not have more then 2 identical characters in a row.
 */
const IDENTICAL_CHARACTER_REGX = new RegExp('\\S*(.)\\1\\1\\S*');

/**
 * Generic function to perform the check for password value using regx.
 */
export function passwordValidator() {
    return function validatePassword(control: FormControl) {
        return PASSWORD_REGX.test(control.value) && !IDENTICAL_CHARACTER_REGX.test(control.value) ? null : {
            validatePassword: {
                valid: false
            }
        };
    };
}

