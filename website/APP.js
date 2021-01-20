/* API url and key  */
let URL ='http://api.worldweatheronline.com/premium/v1/weather.ashx?key=';

/*
    Please change the FreeAPIKey to your own.
    These keys have been provided for testing only.
    If you don't have one, then register now: http://developer.worldweatheronline.com/member/register

*/
let APIkey =' ';

//variables
const zipcode   = document.querySelector('#city');
const genButton = document.querySelector('#generate');



function performAction(){

  let zip  = zipcode.value;
  let newUrl = URL+APIkey+'&q='+zip+'&format=json';

  getData(newUrl)
    .then(function(data){
      let obj= {

        "temp_c"  : data.data.current_condition[0].temp_C,
        "temp_f"  : data.data.current_condition[0].temp_F ,
        "humidity": data.data.current_condition[0].humidity,
        "date"    : data.data.weather[0].date,
        "sunrise" : data.data.weather[0].astronomy[0].sunrise,
        "sunset"  : data.data.weather[0].astronomy[0].sunset,
        "moonrise": data.data.weather[0].astronomy[0].moonrise,
        "moonset" : data.data.weather[0].astronomy[0].moonset,
        "moon_phase": data.data.weather[0].astronomy[0].moon_phase,
        "moon_illumination": data.data.weather[0].astronomy[0].moon_illumination
      };
      postData('/add', obj )
        .then(
          updateUI()
        );
    })
}
// post request
const postData = async (url=' ', data ={} )=>{

  const response = await fetch(url,{
    method :'POST',
    credentials:'same-origin',
    headers:{
      'content-type':'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const newData = await response.json();
    return newData;
  }catch(error){
    console.log("error",error);
  }
};

// get request
const getData = async (url='')=>{
  const request = await fetch(url);
  try{
    const recievedData  = await request.json();
    return recievedData;
  }catch(error){
    console.log("error",error);
  }
};

// update user interface with data
const updateUI = async()=>{

  const respond = await fetch('/send');
  try{
    let res = await respond.json();

    for(let [key, value] of Object.entries(res)){
      let element = document.querySelector('#'+key);
      element.innerHTML=value;
      element.style.color = "white";
    }
  }catch(error){
    console.log("error",error);
  }
}

genButton.addEventListener('click',performAction);
