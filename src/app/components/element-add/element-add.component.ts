import { ElementService } from '../../services/element.service';
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
    { label: 'Algorithm', value: 'algorithm' },
    { label: 'Solution', value: 'solution' },
    { label: 'Random', value: 'random' }
  ];
  languagesList: Language[];
  selectedLanguages: Language[];
  froalaOptions: Object = {
    placeholderText: `
    Edit your content here...
    To add code block, please open Code View then paste your code inside pre tags.
    `,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', '|', 'align', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|' , 'clearFormatting', '|', 'html', '|', 'undo', 'redo'],
    codeBeautifierOptions: {
      end_with_newline: true,
      indent_inner_html: true,
      extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
      brace_style: 'expand',
      indent_char: ' ',
      indent_size: 4,
      wrap_line_length: 0
    },
    codeMirror: true,
    height: 300,
    heightMax: 500,
    tabSpaces: 4
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _languageService: LanguageService,
    private _errorService: ErrorService,
    private _elementService: ElementService

  ) { }

  ngOnInit() {

    //Get Languages
    this._languageService.getLanguages().subscribe(
      (data: any): void => {
        if (data.success) {
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
    this._elementService.addElement(form.value).subscribe(
      (data: any): void => {
        console.log(data);
        if(data.success) {
          console.log(data.element);
        } else {
          console.log(data)
        }
      }, 
      (err: any) => {
        this._errorService.handleError(err);
      }
    );
  }

}
