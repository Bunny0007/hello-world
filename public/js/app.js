const formData = document.querySelector('form');
const search = document.querySelector('input');
const paraOne = document.querySelector('#one');
const paraTwo = document.querySelector('#two');


formData.addEventListener('submit',(e)=>{
    e.preventDefault();
    const Location = search.value;

    paraOne.textContent = "Loding..."
    paraTwo.textContent = ''
    
    fetch('/weather?address='+Location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            paraOne.textContent = data.error
        }else{
            paraOne.textContent = data.location;
            paraTwo.textContent = data.forecast;
        }
    })
})
})