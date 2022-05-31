function createTable(results) {
    let myTable = document.getElementById('table');
    myTable.innerHTML = "";
    let headers = ["fname", "lname", "email", "mobileno", "reserve_id", "startDate", "EndDate", "plate_no","model", "pay_status"]
    
   
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
            console.log(Object.values(emp));
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


const searchCarByPeriod = async (id) => {
    try {
    
      const res = await axios({
        method: 'POST',
        url: '/api/v1/reservation/customer',
        data: {
          id
        }
      });
    
      if ((res.data.status = 'success')) {
      
        createTable(res.data.ress);
      }
    } catch (err) {
      console.log(err);
    
    }
  };
  


const id = document.getElementById("CID");
 
const form = document.getElementById("form");
 
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
       
        searchCarByPeriod(id.value);
    });
}