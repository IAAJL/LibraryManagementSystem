let search = document.getElementById('search');

console.log("Hello");

search.addEventListener('click',e=>{
    window.location.replace("http://localhost:8000/search")
    console.log("Entered");
    // fetch('http://localhost:8000/search',{method:'GET'})
    // .catch(()=>{
    //     alert("Error");
    // })
});

function heelo(){
    console.log("Hello")
}