const containers = document.querySelectorAll('.card-container');

containers.forEach((container) => {
  const card = container.querySelector('.card');
  const cardName = container.querySelector('.name');
  const itemImage = container.querySelector('.detail__img');
  const description = container.querySelector('.detail__description');

  // adiciona eventos
  container.addEventListener('touchmove', (e) => movingEvent(e, card));
  container.addEventListener('mousemove', (e) => movingEvent(e, card));

  container.addEventListener('touchstart', (e) => animationIn(e, card, cardName, itemImage, description));
  container.addEventListener('mouseenter', (e) => animationIn(e, card, cardName, itemImage, description));

  container.addEventListener('touchend', (e) => animationOut(e, card, cardName, itemImage, description));
  container.addEventListener('mouseleave', (e) => animationOut(e, card, cardName, itemImage, description));
});

function movingEvent(event, card) {
  let xAxis, yAxis;

  if (event.type === 'touchmove') {
    event.preventDefault();
    const touch = event.changedTouches[0];
    xAxis = (window.innerWidth / 2 - touch.pageX) / 25;
    yAxis = (window.innerHeight / 2 - touch.pageY) / 25;
  } else {
    xAxis = (window.innerWidth / 2 - event.pageX) / 25;
    yAxis = (window.innerHeight / 2 - event.pageY) / 25;
  }

  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}

function animationIn(event, card, cardName, itemImage, description) {
  if (event.type === 'touchmove') event.preventDefault();
  card.style.transition = 'none';
  
  if (cardName) {
    cardName.style.transform = `translateZ(100px)`;
    cardName.style.filter = `drop-shadow(-20px 64px 20px rgba(0, 0, 0, 0.6))`;
  }
  if (itemImage) {
    itemImage.style.transform = `translateZ(150px)`;
    itemImage.style.filter = `drop-shadow(-30px 64px 20px rgba(0, 0, 0, 0.6))`;
  }
  if (description) {
    description.style.transform = `translateZ(130px)`;
    description.style.filter = `drop-shadow(-30px 64px 20px rgba(0, 0, 0, 0.6))`;
  }
}

function animationOut(event, card, cardName, itemImage, description) {
  if (event.type === 'touchend') event.preventDefault();

  card.style.transition = `all 0.5s ease`;
  card.style.transform = `translateZ(0px)`;

  if (cardName) {
    cardName.style.transform = `translateZ(0px)`;
    cardName.style.filter = `none`;
  }
  if (itemImage) {
    itemImage.style.transform = `translateZ(0px)`;
    itemImage.style.filter = `none`;
  }
  if (description) {
    description.style.transform = `translateZ(0px)`;
    description.style.filter = `none`;
  }
}
