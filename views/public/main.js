let update = document.getElementById("update-button");

function call(){
 console.log("Hello");
//  fetching data from database
fetch('/quotes', {
  method: 'put',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Darth Vadar',
    quote: 'I find your lack of faith disturbing.'
  })
})
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
  console.log(response);
  })
};
