import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  commentForm:FormGroup;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  formErrors = {
    'name':''
  }

  validationcomments = {
    'name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long'
    } ,
    'comment':{
      'required':'Comment is required'
    }
  }
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm()
     }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    //+this.route.snapshot.params['id'] - taking an snapshot of the route at that moment in time
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id) }); 
  }

  createForm() {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]], 
      comment: ''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation comments
  }

  onValueChanged(data? :any)
  {
    if(!this.commentForm){ return;}
    
    const form = this.commentForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const comments = this.validationcomments[field];
        for(const key in control.errors){
          this.formErrors[field] += comments[key] + ' ';
        }
      }
    }
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
