import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  deletedData:any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getDeletedData();
  }

  getDeletedData(){
    this.commonService.get(`getDeletedData`).subscribe((data: any)=>{
      console.log(data.data)
      if(data.status==200){
      this.deletedData=data.data
        
      }else{
      }
    
  })
  

}
private checkKey(data,key: string) {
  return(data.hasOwnProperty(key))
 // this.mapToSearch[newKey] = newValue;
}

}
