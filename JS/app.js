
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(registrado => console.log ("El service Worker se registro", registrado));
}else{
    console.log("serviceWorker no es compatible");
}