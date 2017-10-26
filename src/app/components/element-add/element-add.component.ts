
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-element-add',
  templateUrl: './element-add.component.html',
  styleUrls: ['./element-add.component.css']
})
export class ElementAddComponent implements OnInit {

  addElementForm: FormGroup;
  elementTypes: Object[] = [
    {label: 'Algorithm', value: 'algorithm'},
    {label: 'Solution', value: 'solution'},
    {label: 'Random', value: 'random'}
  ];

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addElementForm = this._formBuilder.group({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      languages: new FormArray([new FormControl(null)]),
      content: new FormControl(null, Validators.required)
    });
  }

}
