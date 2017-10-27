import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Language } from '../../models/Element';
import { ErrorService } from '../../services/error.service';
import { LanguageService } from '../../services/language.service';

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
  languagesList: Language[];
  selectedLanguages: Language[];

  constructor(
    private _formBuilder: FormBuilder,
    private _languageService: LanguageService,
    private _errorService: ErrorService

  ) { }

  ngOnInit() {

    //Get Languages
    this._languageService.getLanguages().subscribe(
      (data: any): void => {
        if(data.success) {
          this.languagesList = data.languages;
        } else {
          this._errorService.handleError(data);
        }
      }, 
      (err: any) => {
        this._errorService.handleError(err);
      }
    );

    this.addElementForm = this._formBuilder.group({
      type: [null, Validators.required],
      title: [null, Validators.required],
      description: null,
      languages: this._formBuilder.array([this.initLanguage()]),
      content: [null, Validators.required]
    });
  }

  initLanguage() {
    return this._formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      code: '',
      parent: ''
    });
  }

  onLanguagesSelect(event) {
    const languageGroup = event.value.map(language => this._formBuilder.group(language));
    const languagesArray = this._formBuilder.array(languageGroup);

    this.addElementForm.setControl('languages', languagesArray);
  }


  onFormSubmit(form) {
    console.log(form);
  }

}
