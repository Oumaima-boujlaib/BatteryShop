
const ratings = document.querySelectorAll('.rating');
const radios = document.querySelectorAll('input[type="checkbox"]');
const form = document.querySelector("form");
const ratingInputs = document.querySelectorAll('.rating input');
const name = document.getElementById('nom');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
let summary = [];
let summary2 = [];
ratings.forEach((rating) => {
  rating.addEventListener('click', (e) => {
    const starValue = e.target.getAttribute('data-value');
    const question = rating.parentNode.querySelector('.qs').textContent;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= starValue) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    summary2.push(`${question} : ${stars}`);
  });
});

radios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const radioValue = e.target.value;
    const question = radio.closest('section').querySelector('h4').textContent;
    summary.push(`${question} : ${radioValue}`);
  });
});

ratings.forEach(rating => {
  const stars = rating.querySelectorAll('.star');
  const ratingValue = rating.querySelector('input');

  stars.forEach((star, idx) => {
    star.addEventListener('click', function() {
      if (star.classList.contains('active')) {
        for (let i = idx; i >= 0; i--) {
          stars[i].classList.remove('active');
          stars[i].classList.replace('bxs-star', 'bx-star');
        }
        ratingValue.value = 0;
      } else {
        for (let i = 0; i <= idx; i++) {
          stars[i].classList.add('active');
          stars[i].classList.replace('bx-star', 'bxs-star');
        }
        ratingValue.value = idx + 1;
      }
    });
  });
});
function sendEmail(){
  let totalScore = 0;
  ratingInputs.forEach(input => {
    totalScore += parseInt(input.value);
  });
  const normalizedScore = totalScore / ratingInputs.length;
  const filledStarsCount = Math.round(normalizedScore);
  let filledStars = '';
  for (let i = 0; i < 5; i++) {
    if (i < filledStarsCount) {
      filledStars += '★';
    } else {
      filledStars += '☆';
    }
  }
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "satisfaction.batteryshop@gmail.com",
    Password : "F283215EC43F9A7BCC1D8F26E76AC63DC49D",
    To : 'satisfaction.batteryshop@gmail.com',
    From : "satisfaction.batteryshop@gmail.com",
    Subject : 'review',
    Body : `Nom Complet : ${name.value} <br> Email : ${email.value} <br> Telephone: ${phone.value} <br> Avis : ${filledStars} <br> <br>
     Details : <br> ${summary.join('<br>')} <br> ${summary2.join('<br>')}`
    
  }).then(
    message =>  {
      if(message=="OK"){
        Swal.fire({
          text: "Thank you for taking the time to complete our survery",
          icon: "success"
        });
      }
    }
  );
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendEmail();
});
