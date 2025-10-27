// script.js
document.getElementById('year').textContent = new Date().getFullYear();

function scrollToEl(id){
  const el = document.getElementById(id);
  if(el){
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

