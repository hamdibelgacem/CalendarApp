import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  days = [
    "Sunday", "Monday","Tuesday",
    "Wednesday", "Thursday", 
    "Friday", "Saturday"];
  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();

  selectYear = document.getElementById("year");
  selectMonth = document.getElementById("month");

  constructor() {
    console.log(this.currentMonth);
    console.log(this.currentYear);

    
  }
  ngOnInit() {
    this.showCalendar(this.currentMonth, this.currentYear);
  }



  showCalendar(month, year) {
    let monthAndYear = document.getElementById("monthAndYear");

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = this.months[month] + " " + year;
    //this.selectYear.value = year;
    //this.selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date.toString());
                if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

  }

}
