# Quick-Start with Angular Forms
Lets start by creating an angular project using angular-cli.

    > npm install -g @angular/cli    #install angular-cli
    > ng new project-name            #create new project
    > cd project-name                #move into our new project folder
    > code .                         #open folder in VS Code
    > ng serve

Ng serve will run a development server on http://localhost:4200 and auto refresh our browser whenever we do any update to our code inside our project folder.

Learn more about angular-cli [here](https://github.com/angular/angular-cli).

## User Interface
We will be using a fixed user signature for our forms, for this we will create an interface, this will be used by Typescript for type checking only.

    ng g interface user

Now this will create user.ts file inside our /src/app/ folder

![Alt text](./src/assets/add-interface.png?raw=true "add interface")

Add following code to this user.ts file.

        export interface User {
            name:{
                first : string,
                last : string
            };
            email : string;
            password : string;  
        }


## Reference Variables
First let's talk about reference variables. We can create a reference to DOM element with #name or ref-name. We will be using # in our code, its value can be accessed with name.value

    <input #name placeholder="type name here">
    <button (click)="submit(name.value)">submit</button>   

## Template Driven Form

Directly from angular glossary : A technique for building Angular forms using HTML forms and input elements in the view. 
 - The "source of truth" is the template. The validation is defined using attributes on the individual input elements.
 - Two-way binding with ngModel keeps the component model synchronized with the user's entry into the input elements.
 - Behind the scenes, Angular creates a new control for each input element, provided you have set up a name attribute and two-way binding for each input.
 - The associated Angular directives are all prefixed with ng such as ngForm, ngModel, and ngModelGroup.
Template-driven forms are convenient, quick, and simple.
 - They are a good choice for many basic data-entry form scenarios.



Now let's create a new component named template-driven using angular-cli with following command. 
        
        > ng g component template-driven

This will create a folder 'template-driven' inside src/app/

![Alt text](./src/assets/template-driven.png?raw=true "add interface")

Our newly created component will also be automatically imported and declared inside our maine module.

![Alt text](./src/assets/module.png?raw=true "import in main module")

- Inside template-driven.component.ts import our User interface and declare our user object.

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

        }    

- Inside template-driven.component.html, create a form element and define reference variable #formName="ngForm", ngForm is a build in directive which provides whole api for controls and status of form.

        <form #signUpForm="ngForm">

        </form>

- Now we will add our form fields and bind it to user model. To get two-way binding with our model we will use [(ngModel)]

        <input 
            type="text" 
            name="first" 
            placeholder="first name"                         
            [(ngModel)]="user.name.first">
    
- Let's add some validation. 

        <div>
            <label for="first">
            <input 
                type="text" 
                name="first" 
                placeholder="first name" 
                #first="ngModel"
                required
                [(ngModel)]="user.name.first">
            </label>
            <div class="error" *ngIf="first.errors?.required && first.touched">
                *required
            </div>
        </div>
Here : 

- > #first will give us a reference to our ngModel and we can check control states.        
- > *ngIf will help us add/remove our validation message div based on control's state. 
- > Checking for touched along with errors will prevent our validation messages from being visible initially when field is untouched.
- > ?. is safe navigation operator, will prevent view from breaking when first.errors in null.



- Complete form with validations will be as below

        <form #signUpForm="ngForm" novalidate (ngSubmit)="submit()">
            <div>
                <label for="first">
                <input 
                    type="text" 
                    name="first" 
                    placeholder="first name" 
                    #first="ngModel"
                    required
                    [(ngModel)]="user.name.first">
                </label>
                <div class="error" *ngIf="first.errors?.required && (first.touched || first.dirty)">
                    *required
                </div>
            </div>

            <div>
                <label for="last">
                <input 
                    type="text" 
                    name="last" 
                    placeholder="last name" 
                    #last="ngModel"
                    required
                    [(ngModel)]="user.name.last">
                </label>
                <div class="error" *ngIf="last.errors?.required && last.touched">
                    *required
                </div>
            </div>

            <div>
                <label for="email">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                        #userEmail="ngModel"
                        required                        
                        [(ngModel)]="user.email">
                </label>
                <div class="error" *ngIf="userEmail.errors?.required && userEmail.touched">
                    *required
                </div>
            </div>

            <div>
                <label for="password">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        #password="ngModel"
                        required
                        [(ngModel)]="user.password">
                </label>
                <div class="error" *ngIf="password.errors?.required && password.touched">
                    *required
                </div>
            </div>

            
            <button type="submit" [disabled]="signUpForm.invalid">submit</button>
            <button type="reset" (click)="reset(signUpForm)">reset</button>
        </form>


- To reset form, we are passing signUpForm reference variable to reset() function inside our component class. By just calling signUpForm.reset() we can set our form as untouched and pristine, and set all properties of user object to null. 

        import {Component} from '@angular/core';
        import { User} from "../models/user";

        @Component({
            selector:"template-form",
            templateUrl : "templateForm.component.html"
        })
        export class TemplateFormComponent {
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
     

## Reactive Form
Directly from angular glossary : A technique for building Angular forms through code in a component. 

When building reactive forms:
- > The "source of truth" is the component. The validation is defined using code in the component.
- > Each control is explicitly created in the component class with new FormControl() or with FormBuilder.
- > The template input elements do not use ngModel.
- > The associated Angular directives are all prefixed with Form, such as FormGroup, FormControl, and FormControlName.
- > Reactive forms are powerful, flexible, and a good choice for more complex data-entry form scenarios, such as dynamic generation of form controls.

Now let's create a new component named reactive using angular-cli with following command. 
        
        > ng g component reactive

This will create a folder 'reactive' inside src/app/

- Inside our reactive.component.ts add following code. 

        import {Component, OnInit} from "@angular/core";
        
        //we need to explicitly import these 
        import {FormControl, FormGroup, Validators} from "@angular/forms";

        @Component({
            selector:"app-reactive",
            templateUrl : "reactive.component.html"
        })

        export class ReactiveComponent implements OnInit{

            user:FormGroup;

            ngOnInit(){
                this.user = new FormGroup({
                    name : new FormGroup({
                        first : new FormControl(""),
                        last : new FormControl("")
                    }),
                    email : new FormControl(""),
                    password : new FormControl("")
                });
            }            
        }

- > FormGroup will be bound in the template to our HTML form.
- > FormControl will be bound in the template to our HTML input element.


- On reactive.component.html add following code

        <form novalidate [formGroup]="user" (ngSubmit)="submit(user.value)">
            
            <div formGroupName="name">
        
                <div>
                    <label>
                        <input 
                            type="text"
                            placeholder="first name"
                            formControlName="first"/>
                    </label>                    
                </div>

                <div>
                    <label>
                        <input 
                            type="text"
                            placeholder="last name"
                            formControlName="last"/>
                    </label>                    
                </div>

            </div>

            ...
        </form>

- > Here novalidate attribute in the form element prevents the browser from attempting native HTML validations.
- > formGroup is a reactive directive which is taking our "user" as instance of formGroup.
- > On form submit we are passing the value of form, we can also pass whole form, in that case we will have access to bunch of methods and properties like user.errors, user.pristine, user.dirty,...
- > formGroupName directive here is for our nested user.name.first and user.name.last input elements. 
- > On input elements we don't need to add ngModel, name or validations, just adding formControlName will do. This keep our html more clean. We need to pass first to formControlName to correctly associate with user.name.first inside our class.


- Validations can be directly added from inside component class. Our updated user object with validations will be as below.


        this.user = new FormGroup({
            name : new FormGroup({
                first : new FormControl("", [Validators.required]),
                last : new FormControl("", [Validators.required])
            }),
            email : new FormControl("", [Validators.email, Validators.required]),
            password : new FormControl("", [Validators.minLength(8), Validators.required])
        });


- Updated reactive.component.html with validation messages will now look like this

        <form novalidate [formGroup]="user" (ngSubmit)="submit(user.value)">
            
            <div formGroupName="name">
                <!--first name-->
                <div>
                    <label>
                        <input 
                            type="text"
                            placeholder="first name"
                            formControlName="first"/>
                    </label>
                    <div *ngIf="user.get('name').get('first').hasError('required') && user.get('name').get('first').touched" class="error">
                        *required
                    </div>
                </div>

                <!--last name-->
                <div>
                    <label>
                        <input 
                            type="text"
                            placeholder="last name"
                            formControlName="last"/>
                    </label>
                    <div *ngIf="user.get('name').get('last').hasError('required') && user.get('name').get('last').touched" class="error">
                        *required
                    </div>
                </div>
            </div>

            <!--email-->
            <div>   
                <label>
                    <input 
                        type="email"
                        placeholder="email"
                        formControlName="email"/>
                </label>
                <div *ngIf="user.get('email').hasError('required') && user.get('email').touched" class="error">
                    *required
                </div>
                <div *ngIf="user.get('email').hasError('email') && user.get('email').touched" class="error">
                    *invalid email
                </div>
            </div>

            <!--password-->
            <div>   
                <label>
                    <input 
                        type="password"
                        placeholder="password"                
                        formControlName="password"/>
                </label>
                <div *ngIf="user.get('password').hasError('required') && user.get('password').touched" class="error">
                    *required
                </div>
                <div *ngIf="user.get('password').hasError('minlength') && user.get('password').touched" class="error">
                    *must be greater than 8 characters
                </div>
            </div>

            <button type="submit" [disabled]="user.invalid">submit</button>
            <button type="reset" (click)="reset()">reset</button>
        </form>

- Complete component class with Form Submit & Reset will be as below.


        import {Component, OnInit} from "@angular/core";

        //we need to explicitly import these form angular/forms
        import {FormControl, FormGroup, Validators} from "@angular/forms";

        @Component({
            selector:"app-reactive",
            templateUrl : "reactive.component.html"
        })

        export class ReactiveComponent implements OnInit{

            user:FormGroup;

            ngOnInit(){
                this.user = new FormGroup({
                    name : new FormGroup({
                        first : new FormControl("", [Validators.required]),
                        last : new FormControl("", [Validators.required])
                    }),
                    email : new FormControl("", [Validators.email, Validators.required]),
                    password : new FormControl("", [Validators.minLength(8), Validators.required])
                });
            }

            /**
            * Handle form submit
            */
            submit(value:User){
                console.log('form submitted');        
                console.log(value);
            }

            /**
            * Reset form
            */
            reset(){
                console.log('reset called');
                this.user.reset();
                console.log(this.user.value);
            }
        }


Now lets put our template-driven and reactive components in action inside our app.component.html

    <h1>ANGULAR FORMS</h1>

    <h3>Reference Variable </h3>
    <div>
        <input #name placeholder="type name here">
        <br/> 
        <button (click)="submit(name.value)">submit</button>    
    </div>
    <br/>

    <h3>Template driven form </h3>
    <app-template-driven></app-template-driven>
    <br/>

    <h3>Reactive form</h3>
    <app-reactive></app-reactive>

    <div>
        <br/><br/>
        <small>*note : check console for output</small>
    </div>

Handle submit for our reference variable inside app.component.ts

    import { Component } from '@angular/core';

    @Component({
        selector: 'app-root',
        templateUrl: 'app.component.html'
    })
    export class AppComponent {
        submit(value: string) {
            console.log(value);
        }
    }

        