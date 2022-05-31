function createTable(results) {
    let myTable = document.getElementById('table');
    myTable.innerHTML = "";
    let headers = ["car_id", "model", "active"];
    
   
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


const searchCarByPeriod = async (date) => {
    try {
    
      const res = await axios({
        method: 'POST',
        url: '/api/v1/car/status/period',
        data: {
          date
        }
      });
    
      if ((res.data.status = 'success')) {
        console.log(res.data.status);
        createTable(res.data.cars);
      }
    } catch (err) {
      console.log(err);
    
    }
  };
  


const day = document.getElementById("day");
 ;
const form = document.getElementById("form");
 
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
       
        searchCarByPeriod(day);
    });
}