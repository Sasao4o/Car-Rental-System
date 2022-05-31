
const searchInput = document.getElementById("searchInput");
 
const carStatussearchInput = document.getElementById("carStatussearchInput");
const carConditionSearchInput = document.getElementById("carConditionSearchInput");
const namesFromDOM = document.getElementsByClassName("searchCarModel");
const names2FromDom = document.getElementsByClassName("searchCarStatus");
const names3FromDom = document.getElementsByClassName("searchCarCondition");
function userSearch(classArray) {
        return (event) => {

            const { value } = event.target;
    
            // get user search input converted to lowercase
            const searchQuery = value.toLowerCase();
            
            for (const nameElement of classArray) {
                const parentWithClass = nameElement.closest('.container');
        
                // store name text and convert to lowercase
                let name = nameElement.textContent.toLowerCase();
                // compare current name to search input
                if (name.includes(searchQuery)) {
                    // found name matching search, display it
                   
                    parentWithClass.style.display = "inline-block";
                } else {
                    // no match, don't display name
                    parentWithClass.style.display = "none";
                }
            }


        }
}
searchInput.addEventListener("keyup", userSearch(namesFromDOM));
carStatussearchInput.addEventListener("keyup", userSearch(names2FromDom));
carConditionSearchInput.addEventListener("keyup", userSearch(names3FromDom));