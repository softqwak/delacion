document.addEventListener("DOMContentLoaded", function() {
    const concertDate = new Date("November 15, 2024 20:00:00").getTime();

    setInterval(function() {
        const now = new Date().getTime();
        const distance = concertDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("time-remaining").innerText = 
            `${days}д ${hours}ч ${minutes}м ${seconds}с`;

        if (distance < 0) {
            clearInterval();
            document.getElementById("time-remaining").innerText = "Концерт уже начался!";
        }
    }, 1000);
});
