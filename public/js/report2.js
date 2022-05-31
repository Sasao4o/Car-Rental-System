function createTable(results) {
    let myTable = document.getElementById('table');
    myTable.innerHTML = "";
    let headers = ["reserve_date",	"startDate",	"EndDate"	,"reserve_status"	,"pay_status",	"NAME"	,"model" , "plate_no", "cond"
    ];
   
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


const searchCarByPeriod = async (plate_no,start_date, end_date) => {
    try {
    
      const res = await axios({
        method: 'POST',
        url: '/api/v1/car/period',
        data: {
            plate_no,
            start_date,
            end_date
        }
      });
    
      if ((res.data.status = 'success')) {
        createTable(res.data.cars);
      }
    } catch (err) {
      console.log(err);
    
    }
  };
  


const startDay = document.getElementById("startDay");
const endDay = document.getElementById("endDay");
const form = document.getElementById("form");
const plate_no = document.getElementById("plate_no");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
       
        searchCarByPeriod(plate_no.value, startDay.value, endDay.value);
    });
}