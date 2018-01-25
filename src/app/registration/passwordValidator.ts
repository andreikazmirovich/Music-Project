import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static matchPassword(ac: AbstractControl) {
        const password = ac.get('password').value,
            rePassword = ac.get('rePassword').value;
            if(password !== rePassword){
                ac.get('rePassword').setErrors({matchPassword: true});
            } else {
                return null;
            }
    }
}