function createTable(results) {
    let myTable = document.getElementById('table');
    myTable.innerHTML = "";
     
    let headers = ["reserve_date"	,"startDate",	"endDate",	"reserve_status",	"pay_status",	"NAME",	"model",	"plate_no",	"cond",	"fname",	"lname",	"email",	"gender",	"mobileno",	"BankNo"];
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        results.forEach(emp => {
            let row = document.createElement('tr');
            Object.values(emp).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            })
            table.appendChild(row);
        });
        myTable.appendChild(table);
   
    
  
  }


const searchByPeriod = async (start_date, end_date) => {
    try {
    
      const res = await axios({
        method: 'POST',
        url: '/api/v1/reservation/period',
        data: {
            start_date,
            end_date
        }
      });
    
      if ((res.data.status = 'success')) {
        createTable(res.data.reservations);
      }
    } catch (err) {
      console.log(err);
    
    }
  };
  


const startDay = document.getElementById("startDay");
const endDay = document.getElementById("endDay");
const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(startDay.value);
        console.log(endDay.value);
        searchByPeriod(startDay.value, endDay.value);
    });
}