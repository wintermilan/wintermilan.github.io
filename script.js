// CodeWeek 2023
// Szolnoki SZC Vásárhelyi Pál Két Tanítási Nyelvű Technikum
// Tanár: Szűcs Ferenc

'use strict';

// Létrehozzuk a szükséges változókat és a 'gondolt' számot
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Függvény segítségével rövidítjük le a különböző szövegek kiíratását
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Eseménykezelőt hozunk létre, ami figyeli az "Ellenőrizd!" gomb lenyomását
document.querySelector('.check').addEventListener('click', function () {
  //  Eltároljuk a szövegmezőbe írt számot
  const guess = Number(document.querySelector('.guess').value);

  // Ellenőrizzük a játékos által megadott számot
  // Ha nincs megfelelő bemeneti érték
  if (!guess) {
    // A fent elkészített függvény segítségével kiíratunk
    displayMessage('⛔️ Nem szám!');
  }
  // Amikor a játékos nyer - a tippelt szám egyenlő a gondolt számmal
  else if (guess === secretNumber) {
    displayMessage('🎉 Eltaláltad!');
    // Kiírjuk az eltalált számot középre
    document.querySelector('.number').textContent = secretNumber;
    // Megváltoztatjuk az oldal háttérszínét
    document.querySelector('body').style.backgroundColor = '#60b347';
    // Megváltoztatjuk a szövegdoboz szélességét
    document.querySelector('.number').style.width = '30rem';

    // Ha az elért pontszám nagyobb, mint a legjobb pontszám,
    // akkor eltároljuk a 'highscore' változóba és kiíratjuk
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  
  // Ha rossz számot írtunk - a tippelt szám nem egyenlő a gondolt számmal
  else if (guess !== secretNumber) {
    // Ha a pontszám még egynél több, akkor fog végrehajtódni
    if (score > 1) {
      // Úgynevezett ternary operátor segítségével megvizsgáljuk,
      // hogy nagyobb-e a tippelt szám és ha igen, akkor a kérdőjel utáni
      // szöveget íratjuk ki, egyébként a kettőspont utánit
      displayMessage(guess > secretNumber ? '📈 Túl sok!' : '📉 Túl kevés!');
      // Eggyel csökkentjük a pontszámot.
      score--;
      // Kiíratjuk az új pontszámot
      document.querySelector('.score').textContent = score;
    }
    // Ha már a pontszámunk egynél kisebb, akkor vesztettünk.
    else {
      displayMessage('💥 Vesztettél!');
      // A pontszámhoz 0 lesz kiírva
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Az 'Újra!' gomb lenyomásának eseménykezelője
// Mindent visszaállítunk az alapállapotba, kivéve a legjobb pontszám  értékét.
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Találgass...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});