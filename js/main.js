let landingPage = document.querySelector(".landing-page");
let toggleSettings = document.querySelector(".toggle-settings i");
let settingsBox = document.querySelector(".settings-box");
let maiColor = localStorage.getItem("color_option");
const colorsList = document.querySelectorAll(".colors-list li");
const randomBackEl = document.querySelectorAll(".random-background span")

if (maiColor !== null) {

    document.documentElement.style.setProperty('--main-color', maiColor);

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        if (element.dataset.color == maiColor) {

            element.classList.add("active")
        }
    })
}

colorsList.forEach( li => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color );

        localStorage.setItem("color_option", e.target.dataset.color);

        addClassActive(e);
    })
})

let backgrondOption = true;
let backgroundInterval ;

let backgroundLocalItem = localStorage.getItem("background_item");

if (backgroundLocalItem !== null) {

    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true') {

        backgrondOption = true;

        document.querySelector(".random-background .yes").classList.add("active");

    }else {

        backgrondOption = false;

        document.querySelector(".random-background .no").classList.add("active");

    }
}

randomBackEl.forEach( span => {

    span.addEventListener("click", (e) => {

        addClassActive(e);

        if (e.target.dataset.background === 'yes') {

            backgrondOption = true;

            randomizeImgs();

            localStorage.setItem("background_item", true);

        } else {
            backgrondOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_item", false);

        }
    })
})

toggleSettings.onclick = function () {

    this.classList.toggle("fa-spin");

    settingsBox.classList.toggle("open");
}


let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs() {

    if (backgrondOption === true) {

        backgroundInterval = setInterval(() => {

            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 10000);
        
    } 
}

randomizeImgs();

let ourSkills = document.querySelector(".skills");
let progress = document.querySelectorAll(".skill-box .skill-progress span");

window.onscroll = function () {


    if (window.scrollY >= ourSkills.offsetTop) {

        progress.forEach(span => {

            span.style.width = span.dataset.width ;
        })
    }
}

let ourGallery = document.querySelectorAll(".gallery img"); 

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        let overLay = document.createElement("div");

        overLay.className = 'over-lay'

        document.body.appendChild(overLay);

        let popupBox = document.createElement("div");

        popupBox.className = 'popup-box'

        if(img.alt !== null) {

            let imgHeading = document.createElement("h3");

            let txtHeating = document.createTextNode(img.alt);

            imgHeading.appendChild(txtHeating);

            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let close = document.createElement("span");

        let txtClose = document.createTextNode("X");

        close.appendChild(txtClose);

        close.className = 'close';

        popupBox.appendChild(close);

        
    })

})

document.addEventListener("click", (e) => {

    if(e.target.className == "close") {

        e.target.parentNode.remove();

        document.querySelector(".over-lay").remove();
    }

})

const links = document.querySelectorAll(".links a");

links.forEach(link => {
    
    let bullet = document.createElement("div");
    
    bullet.className = 'nav-bullet';
    bullet.setAttribute("data-section", link.dataset.section);
    
    let toolTip = document.createElement("div");
    toolTip.className= 'tooltip';
    let textTool = document.createTextNode(link.innerHTML);
    
    toolTip.appendChild(textTool);
    bullet.appendChild(toolTip);
    document.querySelector(".nav-bullets").appendChild(bullet);
})

const bullets = document.querySelectorAll(".nav-bullets .nav-bullet");

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            })
        })
    })
}

scrollToSomewhere(links);
scrollToSomewhere(bullets);

function addClassActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    })
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("buttets_option");

if (bulletLocalItem !== null ) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(bullet => {

    bullet.addEventListener("click", (e) => {

        if (bullet.dataset.display === "show" ) {

            bulletsContainer.style.display = "block";

            localStorage.setItem("buttets_option", 'block');

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("buttets_option", 'none');

        }

        addClassActive(e);
    })
})

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    window.location.reload();

}
let menu = document.querySelector(".header-area .toggle-menu");
let linksMenu = document.querySelector(".header-area .links");

menu.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    linksMenu.classList.toggle("open");
}


document.addEventListener("click", (e) => {

    if (e.target !== menu && e.target !== linksMenu) {

        if (linksMenu.classList.contains("open")) {

            linksMenu.classList.toggle("open");
            
            menu.classList.toggle("menu-active");
        }
    }
})

linksMenu.onclick = function (e) {

    e.stopPropagation();
}