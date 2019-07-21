import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskData } from '../TaskData';

// import modal component
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  week = [
    "Sunday", "Monday","Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"];
  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  today = new Date();
  days = [];
  week1 = [];
  week2 = [];
  week3 = [];
  week4 = [];
  week5 = [];
  week6 = [];
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  firstDay = (new Date(this.currentYear, this.currentMonth)).getDay();
  daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  openModal(day): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      hasBackdrop: true,
      disableClose: false,
      width: '500px',
      data: {currentMonth: this.currentMonth, currentYear: this.currentYear, currentDay: day }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  /**
   * @description: function get the pervious month.
   */
  perviousMonth(){
    this.emptyObjects();
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth-1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  /**
   * @description: function get the next month.
   */
  nextMonth(){
    this.emptyObjects();
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
    console.log(this.week6)
    console.log(this.week5)
  }

  divideIntoWeek() {
    for (let i = 0; i < this.daysInMonth; i++) {
      let week = Math.floor(i / 7);

      switch (week) {
        case 0:
          this.week1.push(this.days[i]);
          break;
        case 1:
          this.week2.push(this.days[i]);
          break;
        case 2:
          this.week3.push(this.days[i]);
          break;
        case 3:
          this.week4.push(this.days[i]);
          break;
        case 4:
          this.week5.push(this.days[i]);
          break;
        case 5:
          this.week6.push(this.days[i]);
      }
    }
  }

  emptyObjects(){
    this.days=[];
    this.week1=[];
    this.week2=[];
    this.week3=[];
    this.week4=[];
    this.week5=[];
    this.week6=[];
   }

  showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
              this.days.push(null);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
              this.days.push(date);
              date++;
            }
        }
    }
    this.divideIntoWeek();
  }
}
