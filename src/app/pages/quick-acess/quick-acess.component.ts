import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

// import * as $ from 'jquery';

declare var $: any; 

@Component({
  selector: 'app-quick-acess',
  templateUrl: './quick-acess.component.html',
  styleUrls: ['./quick-acess.component.css']
})
export class QuickAcessComponent implements OnInit {
  subjectTitle:any;
  subjects:any;
  searchSubjects:any;
  selectedSub:any;
  subjectId:any;
  notesName:any;
  notes:any;
  noteTitle:any;
  noteId:any;
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  constructor(private commonService: CommonService,private _router: Router,private formBuilder: FormBuilder) { }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  ngOnInit(): void {
    this.getSubjects()
    this.getNotes()
  }
  addModal(){
    this.subjectTitle="";
    $('#exampleModalCenter').modal('show');

  }
  addNotesModal(){
    this.notesName="";
    this.selectedSub="";
    this.searchSubjects=[];
    $('#exampleModalCenter1').modal('show');

  }

  creteSubject(){
    let body={
      subjectTitle:this.subjectTitle
    }

    this.commonService.post('createSubject',body).subscribe((data: any)=>{
      if(data.status==200){
        $('#exampleModalCenter').modal('hide');
        this.getSubjects()

      }else{

      }

    },
    (error) => { 

  })

  }
  updateSubject(){
    let body={
      subjectTitle:this.subjectTitle,
      subjectId:this.subjectId
    }

    this.commonService.post('updateSubject',body).subscribe((data: any)=>{
      console.log(data)
      if(data.status==200){
        $('#exampleModalCenter2').modal('hide');
        this.getSubjects()

      }
    },
    (error) => { 

  })

  }
  editNotes(note,id){
    alert(note)
    this.noteTitle=note
    this.noteId=id
  
  }
  updateNote(){
    let body={
      noteTitle:this.noteTitle,
      noteId:this.noteId
    }
    this.commonService.post('updateNotes',body).subscribe((data: any)=>{
      console.log(data)
      if(data.status==200){
        $('#exampleModalCenter3').modal('hide');
        this.getNotes()

      }
    },
    (error) => { 

    })
  }



  getSubjects(){
    this.commonService.get(`getSubjects`).subscribe((data: any)=>{
      console.log(data.data)
      if(data.status==200){
        this.subjects=data.data
        
      }else{
        this.subjects=[]
      }
    
  })
  

}

searchSubject(event){
  let value=event.target.value;
    let body={
      subjectName:value
    }
    this.commonService.post('searchSubject',body).subscribe((data: any)=>{
      if(data.status==200){
        this.searchSubjects=data.data;
      }else{
        this.searchSubjects=[]
      }
    
  })
}
routeOnSubject(selectedSub,id){
  this.selectedSub=selectedSub;
  this.subjectId=id;
  this._router.navigate([`notes/${this.subjectId}`]);

}

routeOnNotes(notesName,id){
  this._router.navigate([`notesWriting/${id}`]);

}
selectSubject(selectedSub,id){
  // alert(id)
  this.selectedSub=selectedSub;
  this.subjectId=id;
  //this._router.navigate([`notes/${this.subjectId}`]);



}
createNotes(){
  let body={
    subjectId:this.subjectId?this.subjectId:'',
    notesName:this.notesName
  }
    this.commonService.post('createNotes',body).subscribe((data: any)=>{
      console.log(data)
      if(data.status==200){
        this.getNotes()

        $('#exampleModalCenter1').modal('hide');

      }else{

      }

    },
    (error) => { 

    })

}

getNotes(){
  this.commonService.get(`getNotes`).subscribe((data: any)=>{
    console.log(data.data)
    if(data.status==200){
      this.notes=data.data.filter(d=>(d.subjectId == null))
      
    }
  
})


}
deleteSubject(id){
    this.subjectId=id 
    this.commonService.delete('deleteSubject',this.subjectId).subscribe((data: any)=>{
      if(data.status==200){
        this.getSubjects();
      }else{

      }

    },
    (error) => { 

    })

}
deleteNotes(id){
  alert(id)
  this.commonService.delete('deleteNotes',id).subscribe((data: any)=>{
    console.log(data)
    if(data.status==200){
      this.getNotes();
    }

  })
}
editSubject(subject,id){
 // alert("enter")
  this.subjectTitle=subject
  this.subjectId=id



}


onValueChange(value: Date): void {
  //alert(moment(value).format("MMM Do YYYY"));
  this.commonService.get(`getNotes`).subscribe((data: any)=>{
    console.log(data.data)
    if(data.status==200){
      this.notes=data.data.filter(d=>(d.subjectId == null))
      
    this.notes = this.notes.filter(
    m => moment(m.createdAt).format("MMM Do YYYY") == moment(value).format("MMM Do YYYY")
    );
      
    }
  
})
this.commonService.get(`getSubjects`).subscribe((data: any)=>{
  console.log(data.data)
  if(data.status==200){
    this.subjects=data.data
    this.subjects = this.subjects.filter(
      m => moment(m.createdAt).format("MMM Do YYYY") == moment(value).format("MMM Do YYYY")
      );
    
  }

})
       
}



}
