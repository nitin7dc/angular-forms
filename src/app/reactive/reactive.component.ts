import { Component, OnInit } from "@angular/core";

//we need to explicitly import these form angular/forms
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../user";

@Component({
    selector: "app-reactive",
    templateUrl: "reactive.component.html"
})
export class ReactiveComponent implements OnInit {

    user: FormGroup;    

    ngOnInit() {
        this.user = new FormGroup({
            name: new FormGroup({
                first: new FormControl("", [Validators.required]),
                last: new FormControl("", [Validators.required])
            }),
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [Validators.minLength(8), Validators.required])
        });
    }

    /**
    * Handle form submit
    */
    submit(value:User) {
        console.log('form submitted');        
        console.log(value);          
    }

    /**
     * Reset form
     */
    reset() {
        console.log('reset called');
        this.user.reset();        
        console.log(this.user.value);
    }
}