const slideClass = "slide-img";
const btn = "rectangle-slide";
var currentSlide =0;
var myFunc;

function showSlide(){
    console.log(currentSlide);
    var slides = document.getElementsByClassName(slideClass);
    var rectangle = document.getElementsByClassName(btn);

    currentSlide=currentSlide%slides.length;

    var pre = 0;
    if (currentSlide==0){
        pre = slides.length-1;
    }
    else{
        pre=currentSlide-1;
    }
    
    slides[currentSlide].style.display = "block";
    slides[pre].style.display = "none";

    rectangle[currentSlide].classList.add("btn-active");
    rectangle[pre].classList.remove("btn-active");

    currentSlide++;
    myFunc = setTimeout(showSlide, 1000);
}
function setSlide(n){
    currentSlide = n;
    clearTimeout(myFunc);
    var slides = document.getElementsByClassName(slideClass);
    var rectangle = document.getElementsByClassName(btn);
    
    for (var i = 0 ;i<slides.length;i++){
        slides[i].style.display = "none";
        rectangle[i].classList.remove("btn-active");
    }
    slides[currentSlide].style.display ="block";
    rectangle[currentSlide].classList.add("btn-active");
    showSlide();
}
