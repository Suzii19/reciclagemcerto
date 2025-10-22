// ================= Carrossel =================
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  const x = document.getElementsByClassName("mySlides");
  if (n > x.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = x.length; }
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

// ================= Parallax =================
const container = document.querySelector('.card-container');
const card = document.querySelector('.card');
const cardMainImage = document.querySelector('.card__img'); // Defina a classe correta no HTML
const cardName = document.querySelector('.name');
const itemImage = document.querySelector('.detail__img');
const description = document.querySelector('.detail__description');

container.addEventListener('touchmove', movingEvent);
container.addEventListener('mousemove', movingEvent);

container.addEventListener('touchstart', animationIn);
container.addEventListener('mouseenter', animationIn);

container.addEventListener('touchend', animationOut);
container.addEventListener('mouseleave', animationOut);

function movingEvent(event) {
  let xAxis, yAxis;

  if (event.type === 'touchmove') {
    event.preventDefault();
    xAxis = (window.innerWidth / 2 - event.touches[0].pageX) / 25;
    yAxis = (window.innerHeight / 2 - event.touches[0].pageY) / 25;
  } else {
    xAxis = (window.innerWidth / 2 - event.pageX) / 25;
    yAxis = (window.innerHeight / 2 - event.pageY) / 25;
  }

  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}

function animationIn(event) {
  if (event.type === 'touchstart') event.preventDefault();

  card.style.transition = 'none';

  cardMainImage.style.transform = `translateZ(300px)`;
  cardMainImage.style.filter = `drop-shadow(-40px 64px 20px rgba(0, 0, 0, 0.3))`;

  cardName.style.transform = `translateZ(100px)`;
  cardName.style.filter = `drop-shadow(-20px 64px 20px rgba(0, 0, 0, 0.6))`;

  itemImage.style.transform = `translateZ(150px)`;
  itemImage.style.filter = `drop-shadow(-30px 64px 20px rgba(0, 0, 0, 0.6))`;

  description.style.transform = `translateZ(130px)`;
  description.style.filter = `drop-shadow(-30px 64px 20px rgba(0, 0, 0, 0.6))`;
}

function animationOut(event) {
  if (event.type === 'touchend') event.preventDefault();

  card.style.transition = `all 0.5s ease`;
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;

  cardMainImage.style.transform = `translateZ(0px)`;
  cardMainImage.style.filter = `none`;

  cardName.style.transform = `translateZ(0px)`;
  cardName.style.filter = `none`;

  itemImage.style.transform = `translateZ(0px)`;
  itemImage.style.filter = `none`;

  description.style.transform = `translateZ(0px)`;
  description.style.filter = `none`;
}
