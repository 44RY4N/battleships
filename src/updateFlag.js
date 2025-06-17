function updateFlag(speed) {
  const anim = document.querySelector('animateTransform');
  if (!anim) return;

  let duration;

  if (speed <= 5) duration = 6;
  else if (speed <= 15) duration = 4.5;
  else if (speed <= 25) duration = 3.5;
  else if (speed <= 35) duration = 2.5;
  else if (speed <= 45) duration = 1.8;
  else if (speed <= 60) duration = 1.2;
  else if (speed <= 75) duration = 0.8;
  else duration = 0.5;

  anim.setAttribute('dur', `${duration}s`);
}

export {updateFlag};
