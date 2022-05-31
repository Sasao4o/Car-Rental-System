const holderName = document.getElementById("holderName");
const cardNumber = document.getElementById("cardNumber");
const month = document.getElementById("month-select");
const year = document.getElementById("year-select");
const cvv = document.getElementById("cvv");

const form = document.getElementById("form");
 
const pay = async (reserve_id, Did, cost) => {
    try {
    
      const res = await axios({
        method: 'POST',
        url: '/api/v1/cpc/pay',
        data: {
          reserve_id,
          Did,
          cost
        }
      });
    
      if ((res.data.status = 'success')) {
        console.log(res.data.status);
        console.log(res.data);
         alert("Your Payment Done Sucessfully...");
         
         window.setTimeout(() => {
            location.assign('/');
          }, 800);
          
      }
    } catch (err) {
      console.log(err);
    
    }
  };
  const getDemanderId = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/user/demanderId',
          });
      
      if ((res.data.status == 'success')) {
            
            return res.data.id;
      }
    } catch (err) {
      console.log(err);
    
    }
     
  };

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const reserve_id = window.location.pathname.split("/")[3];
       const demander_id = await getDemanderId();
        pay(reserve_id, demander_id, 300);
 
        
        
})
}