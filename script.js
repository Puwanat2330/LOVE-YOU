// คอมเมนต์: เมื่อเอกสาร HTML โหลดเสร็จเรียบร้อย ให้เริ่มต้นฟังก์ชันหลัก
document.addEventListener('DOMContentLoaded', () => {

    // ######################## A. การจัดการ INTRO SCREEN ########################
    const introScreen = document.getElementById('intro-screen');
    const startButton = document.getElementById('start-btn');
    const mainGallery = document.getElementById('main-gallery');

    // คอมเมนต์: ตั้งค่าเริ่มต้นให้ Intro Screen เป็นหน้า Active 
    // และเมื่อกดปุ่ม Start ให้เปลี่ยนไปหน้า Gallery
    if (startButton) {
        startButton.addEventListener('click', () => {
            // ซ่อน Intro Screen
            introScreen.classList.remove('active');
            // แสดงหน้า Main Gallery
            mainGallery.classList.add('active');
        });
    }

    // ######################## 1. การสลับหน้า (Page Navigation) ########################

    // คอมเมนต์: ดึงปุ่มทั้งหมดที่ใช้ในการเปลี่ยนหน้า (Gallery Items และ Back Buttons)
    const navButtons = document.querySelectorAll('.gallery-item, .back-btn');
    // NOTE: ตอนนี้ต้องรวม intro-screen เข้าไปด้วย แต่เราจะซ่อนมันด้วยปุ่ม start-btn
    const allPages = document.querySelectorAll('.page');

    // คอมเมนต์: ฟังก์ชันสลับหน้า
    function navigateTo(targetId) {
        allPages.forEach(page => {
            // ซ่อนหน้าทั้งหมด
            page.classList.remove('active');
        });
        // แสดงหน้าเป้าหมาย
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            // คอมเมนต์: เมื่อสลับไปหน้า Photo Gallery ให้เรียกฟังก์ชันเริ่ม Scroll Animation
            if (targetId === 'photo-gallery') {
                initScrollAnimation();
            }
        }
    }

    // คอมเมนต์: เพิ่ม Event Listener ให้กับปุ่มทั้งหมด
    navButtons.forEach(button => {
        // ตรวจสอบว่าไม่ใช่กล่อง Coming Soon ที่คลิกไม่ได้
        if (!button.classList.contains('coming-soon')) {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                if (targetId) {
                    navigateTo(targetId);
                }
            });
        }
    });

    // ######################## B. โค้ดฟังก์ชันอื่น ๆ (เหมือนเดิม) ########################

    // **ส่วนที่ 2: Love Box (สุ่มอิโมจิ)**
    const sendLoveBtn = document.getElementById('send-love-btn');
    const loveBox = document.getElementById('love-box');
    const loveEmojis = ['💖', '❤️', '💕', '🥰', '😘', '😍', '💘', '💜', '🧡', '💛'];

    function spawnEmoji() {
        // ... (โค้ดเดิม) ...
        const emoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
        const emojiElement = document.createElement('span');
        emojiElement.classList.add('falling-emoji');
        emojiElement.textContent = emoji;

        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 4;

        emojiElement.style.fontSize = `${size}em`;
        emojiElement.style.left = `${startX}vw`;
        emojiElement.style.top = `-50px`;
        emojiElement.style.animationDuration = `${duration}s`;

        loveBox.appendChild(emojiElement);

        setTimeout(() => {
            emojiElement.remove();
        }, duration * 1000);
    }

    if (sendLoveBtn) {
        sendLoveBtn.addEventListener('click', () => {
            const count = Math.floor(Math.random() * 50) + 50;
            for (let i = 0; i < count; i++) {
                setTimeout(spawnEmoji, i * 20);
            }
        });
    }

    // **ส่วนที่ 3: Anniversary Counter (Real-time)**
    const anniversaryDateString = "May 31, 2025 00:00:00 GMT+0700";
    const anniversaryStart = new Date(anniversaryDateString).getTime();

    function updateAnniversaryCounter() {
        const now = new Date().getTime();
        const distance = now - anniversaryStart;

        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;

        let start = new Date(anniversaryStart);
        let current = new Date(now);

        let years = current.getFullYear() - start.getFullYear();
        let months = current.getMonth() - start.getMonth();
        let days = current.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const daysInLastMonth = new Date(current.getFullYear(), current.getMonth(), 0).getDate();
            days += daysInLastMonth;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const hours = Math.floor((distance % msPerDay) / msPerHour);
        const minutes = Math.floor((distance % msPerHour) / msPerMinute);
        const seconds = Math.floor((distance % msPerMinute) / msPerSecond);
        const milliseconds = Math.floor((distance % msPerSecond));

        const pad = (num, len = 2) => String(num).padStart(len, '0');

        const yearsEl = document.getElementById('years');
        if (yearsEl) {
            yearsEl.textContent = pad(years);
            document.getElementById('months').textContent = pad(months);
            document.getElementById('days').textContent = pad(days);
            document.getElementById('hours').textContent = pad(hours);
            document.getElementById('minutes').textContent = pad(minutes);
            document.getElementById('seconds').textContent = pad(seconds);
            document.getElementById('milliseconds').textContent = pad(milliseconds, 3);
        }
    }

    if (document.getElementById('anniversary-counter')) {
        setInterval(updateAnniversaryCounter, 10);
    }


    // **ส่วนที่ 4: Birthday Countdown**
    const birthdays = [
        { name: "Peach", dob: "01/22/2008", id: "peach-countdown" },
        { name: "Toon", dob: "01/05/2006", id: "toon-countdown" }
    ];

    function updateBirthdayCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();

        birthdays.forEach(person => {
            let nextBirthday = new Date(`${person.dob.split('/')[0]}/${person.dob.split('/')[1]}/${currentYear}`);

            if (now.getTime() > nextBirthday.getTime()) {
                nextBirthday = new Date(`${person.dob.split('/')[0]}/${person.dob.split('/')[1]}/${currentYear + 1}`);
            }

            const distance = nextBirthday.getTime() - now.getTime();

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const countdownEl = document.getElementById(person.id);

            if (countdownEl) {
                if (distance < 0) {
                    countdownEl.innerHTML = `🎉 **HAPPY BIRTHDAY!** 🎉`;
                } else {
                    countdownEl.innerHTML = `<span class="days">${days}</span> วัน <span class="hours">${String(hours).padStart(2, '0')}</span> ชม. <span class="minutes">${String(minutes).padStart(2, '0')}</span> นาที`;
                }
            }
        });
    }

    if (document.getElementById('birthday-countdown')) {
        updateBirthdayCountdown();
        setInterval(updateBirthdayCountdown, 1000);
    }

    // **ส่วนที่ 5: Scroll Reveal**
    const polaroidItems = document.querySelectorAll('.polaroid-item');

    function initScrollAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        polaroidItems.forEach(item => {
            observer.observe(item);
        });
    }

    // คอมเมนต์: ตรวจสอบว่าหน้าแรกไม่ใช่ Intro screen ก่อน
    if (mainGallery.classList.contains('active') && document.getElementById('photo-gallery').classList.contains('active')) {
        initScrollAnimation();
    }
});