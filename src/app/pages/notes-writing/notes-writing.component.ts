import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-notes-writing',
  templateUrl: './notes-writing.component.html',
  styleUrls: ['./notes-writing.component.css']
})
export class NotesWritingComponent implements OnInit {
  @ViewChild("media") media: ElementRef;
  @ViewChild("media1") media1: ElementRef;
  form: FormGroup;
  content:any
  htmlContent=''
  notes:any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      signature: ['', Validators.required]
    });

  }
  ngAfterViewInit() { }

  onKeyUp(innerText){
    // console.log(this.media1.nativeElement.innerHTML)
    this.content=innerText

    console.log(this.content)

  }

  getImage(event){
    const file = event.target.files[0];
    var reader = new FileReader();
    let dataURI;

    reader.addEventListener(
      "load",
      function() {
        dataURI = reader.result;
  
        const img = document.createElement("img");
        img.src = dataURI;
        var editorContent=document.querySelector(".editor");
        editorContent.appendChild(img);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }

  }
  execCommandWithArg (command, arg) {
    document.execCommand(command, false, arg);
  }
  execCommand(event,command,arg){ 
    
      //console.log(event.target.classList) 

      if(event.target.classList.contains('mystyle')){
        event.target.classList.remove('mystyle')
      }else{
        event.target.classList.add('mystyle')
      }
        
  document.execCommand(command, false, '');
  }
   link() {
    var url = prompt("Enter the URL");
    document.execCommand("createLink", false, url);
  }
}
