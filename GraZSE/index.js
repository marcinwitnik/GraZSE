let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Zmienne dla dźwięków
let backgroundMusic = new Audio("sounds/background.mp3");
let wrongMusic = new Audio("sounds/wrong.mp3");

// Funkcja odtwarzania muzyki w tle
function playBackgroundMusic(volume = 0.5) {
    backgroundMusic.loop = true; // Zapętlenie muzyki
    backgroundMusic.volume = volume; // Ustawienie głośności
    backgroundMusic.play().catch((error) => {
        console.error("Błąd podczas odtwarzania muzyki w tle:", error);
    });
}

// Funkcja zatrzymywania muzyki w tle
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Resetowanie do początku
}

// Funkcja odtwarzania muzyki związanej z przegraną
function playWrongMusic() {
    wrongMusic.currentTime = 0; // Zawsze odtwarzaj od początku
    wrongMusic.play().catch((error) => {
        console.error("Błąd podczas odtwarzania muzyki przegranej:", error);
    });
}

// Automatyczne odtwarzanie muzyki po załadowaniu aplikacji
document.addEventListener("DOMContentLoaded", function () {
    playBackgroundMusic(0.5); // Odtwarzaj muzykę w tle z głośnością 0.5
    console.log("Muzyka tła gra po odpaleniu aplikacji.");
});

// Start gry na naciśnięcie klawisza
$(document).keypress(function () {
    if (!started) {
        $("#game-over-text").fadeOut(0); // Ukryj napis "Game Over" natychmiast
        stopBackgroundMusic(); // Zatrzymaj bieżącą muzykę i odtwórz z ciszą
        playBackgroundMusic(0.1); // Odtwarzaj muzykę w tle z cichszą głośnością podczas gry
        $("#level-title").text("Poziom " + level);
        nextSequence();
        started = true;
    }
});

// Obsługa kliknięcia w przycisk
$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Generowanie następnej sekwencji
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Poziom " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Dodanie efektu białej obramówki
    $("#" + randomChosenColor)
        .addClass("highlight");
    setTimeout(function () {
        $("#" + randomChosenColor).removeClass("highlight");
    }, 1000); // Obramówka widoczna przez 1 sekundę

    playSound(randomChosenColor);
}

// Sprawdzanie odpowiedzi użytkownika
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        stopBackgroundMusic(); // Zatrzymaj muzykę w tle
        playWrongMusic(); // Odtwarzaj muzykę przegranej
        $("body").addClass("game-over");
        $("#level-title").text("KONIEC GRY, NACIŚNIJ DOWOLNY KLAWISZ, ABY ROZPOCZĄĆ");

        // Wyświetl napis "Game Over" z opóźnieniem
        setTimeout(function () {
            $("#game-over-text").fadeIn(500); // Pokaż napis z efektem
        }, 500);

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Odtwarzanie dźwięku
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch((error) => {
        console.error("Nie można odtworzyć dźwięku:", error);
    });
}

// Animacja wciśnięcia przycisku
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Resetowanie gry
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    console.log("Oczekiwanie na decyzję użytkownika...");
}


// Wykonał: Marcin Witnik