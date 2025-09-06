//First project: create a picture slider for the background of the website

console.log("Javascript Loaded");


const images = [
    "images/DONT.png", "images/FIGHT.png", "images/BELIEVE.png", "images/REMEMBER.png"
];



//Second project: Add cool transitions when you hover over the different tabs

    const tabs = document.querySelectorAll(".tab"); //fix at some point (current me is way too mad and fed up with it)

    tabs.forEach(tab => {
        let current = 0;

        let animationID;

    function fade(direction){

            if(animationID) cancelAnimationFrame(animationID);
            if(direction === 1){
                current += 0.02;
            tab.style.backgroundColor = `rgba(128,128,128,${current})`;

            if(current <= 1){
                animationID = requestAnimationFrame(() => fade(direction));
                }
            }else if (direction === -1){
                current -= 0.02;
            tab.style.backgroundColor = `rgba(128,128,128,${current})`;

            if(current > 0){
                animationID = requestAnimationFrame(() => fade(direction));
                }
            }
        }

        tab.addEventListener("mouseover", function(){
            fade(+1);
        });
        tab.addEventListener("mouseleave", function(){
            fade(-1);
        });
    });

console.log('Tabs found:', document.querySelectorAll('.tab').length);

//Third project: Add a fade out when you click onto each tab

window.addEventListener("DOMContentLoaded", () => {
  loadPage("home.html");
});

// your existing tab click handler
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const url = tab.dataset.page;

    document.body.classList.add("fade-out");

    setTimeout(() => {
      loadPage(url);
      document.body.classList.remove("fade-out");
    }, 500);
  });
});

// helper: load partial HTML into #content
function loadPage(url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector("#content").innerHTML = html;

      const background = document.getElementById("slider-background");

      if(background){
        let index = 0;

        background.style.backgroundImage = `url("${images[index]}")`; //initial img

        setInterval(()=>{
          index = (index + 1) % images.length;
          background.style.backgroundImage = `url("${images[index]}")`; //Need quotations around the url!
        }, 3000); //changes every 3 seconds
      }
    });
}
