// src/serviceWorkerRegistration.js
export function register(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').then(()=> {
      console.log("SW registered");
    }).catch(e=> console.log("SW error", e));
  }
}
