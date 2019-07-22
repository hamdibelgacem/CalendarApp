import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
 }  from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

import { TaskData } from '../TaskData';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  // task = {
  //     project: String,
  //     begin: Date,
  //     end: Date,
  //     pause: Date,
  //     comment: String
  // };
  public tasks : TaskData[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = false;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close();
    console.log(this.data)
    this.tasks.push({
      project: this.data.project,
      beginDate: this.data.beginDate,
      endDate: this.data.endDate,
      pause: this.data.pause,
      comment: this.data.comment,
      currentDay: this.data.currentDay,
      currentMonth: this.data.currentMonth,
      currentYear: this.data.currentYear
    })
    console.log(this.tasks)
  }

  ngOnInit() {
  }

}
