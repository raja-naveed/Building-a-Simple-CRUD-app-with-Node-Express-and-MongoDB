let update = document.getElementById("update-button");

function call(){
 console.log("Hello");
 fetch("/quotes", {
   method: "put",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
     name: "Darth Vader",
     quote: "I find your lack of faith disturbing.",
   }),
 });
};