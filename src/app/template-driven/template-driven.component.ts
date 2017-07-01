import {Component} from '@angular/core';
import { User} from "../user"; //importing our user interface

@Component({
    selector:"app-template-driven",
    templateUrl : "template-driven.component.html"
})
export class TemplateDrivenComponent {

    //setting default values for our user model object.
    user: User = {
        name: {
            first : '',
            last : ''
        },
        email : '',
        password : ''
    };

    /**
     * Handle form submit
     */
    submit(){
        console.log('form submitted');        
        console.log(this.user);
    }

    /**
     * Reset form
     */
    reset(signUpForm){
        console.log('reset called');
        signUpForm.reset();
        console.log(this.user);
    }

}