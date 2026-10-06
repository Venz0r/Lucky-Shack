Проверяем комбинацию
  --------------------------------- */

  const threeSame =
    result[0] === result[1] &&
    result[1] === result[2];

  if (threeSame) {

    /*
      Базовая награда
      за конкретный символ.
    */

    const reward =
      rewards[result[0]] || 100;

    /*
      Увеличиваем серию.
    */

    streak++;

    /*
      Если игрок сделал
      минимум 3 успешных раунда
      подряд — небольшой бонус.
    */

    const bonus =
      streak >= 3
        ? 50
        : 0;

    const total =
      reward + bonus;

    score += total;

    /* Сообщение */

    if (bonus > 0) {

      messageElement.textContent =
        `Серия x${streak}! +${total} очков 🔥`;

    } else {

      messageElement.textContent =
        `Тройка! +${total} очков 🎉`;

    }

    /*
      Анимация победы.
    */

    reelElements.forEach(
      reel =>
        reel.classList.add(
          "win"
        )
    );

    setTimeout(() => {

      reelElements.forEach(
        reel =>
          reel.classList.remove(
            "win"
          )
      );

    }, 500);

  } else {

    /*
      Если комбинации нет,
      серия сбрасывается.
    */

    streak = 0;

    messageElement.textContent =
      "Почти! Попробуй ещё ✨";

  }

  /* ---------------------------------
     Лучший результат
  --------------------------------- */

  if (score > best) {

    best = score;

  }

  /* ---------------------------------
     Сохраняем данные
  --------------------------------- */

  saveProgress();

  renderStats();

  /* ---------------------------------
     Разрешаем играть снова
  --------------------------------- */

  await wait(250);

  playButton.disabled = false;

}

/* =========================
   КНОПКА ИГРЫ
========================= */

playButton.addEventListener(
  "click",
  play
);

/* =========================
   ПЕРВИЧНЫЙ РЕНДЕР
========================= */

renderStats();

/* =====================================================
   TELEGRAM MINI APP
===================================================== */

/*
  Если приложение открыто
  непосредственно внутри Telegram,
  Telegram предоставляет объект:

  window.Telegram.WebApp

  Нам не нужно использовать его
  для обычного запуска в браузере,
  поэтому сначала проверяем,
  существует ли он.
*/

if (
  window.Telegram &&
  window.Telegram.WebApp
) {

  /*
    Сообщаем Telegram,
    что приложение загрузилось.
  */

  window.Telegram.WebApp.ready();

  /*
    Просим Telegram
    развернуть Mini App.
  */

  window.Telegram.WebApp.expand();

}