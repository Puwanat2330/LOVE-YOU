// คอมเมนต์: เมื่อเอกสาร HTML โหลดเสร็จเรียบร้อย ให้เริ่มต้นฟังก์ชันหลัก
document.addEventListener('DOMContentLoaded', () => {

    // ######################## A. การจัดการ INTRO SCREEN (ส่วนเดิม) ########################
    const introScreen = document.getElementById('intro-screen');
    const startButton = document.getElementById('start-btn');
    const mainGallery = document.getElementById('main-gallery');

    if (startButton) {
        startButton.addEventListener('click', () => {
            introScreen.classList.remove('active');
            mainGallery.classList.add('active');
        });
    }

    // ######################## 1. การสลับหน้า (Page Navigation) (ส่วนเดิม) ########################
    const navButtons = document.querySelectorAll('.gallery-item, .back-btn');
    const allPages = document.querySelectorAll('.page');

    function navigateTo(targetId) {
        allPages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            if (targetId === 'photo-gallery') {
                initScrollAnimation();
            }
        }
    }

    navButtons.forEach(button => {
        if (!button.classList.contains('coming-soon')) {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                if (targetId) {
                    navigateTo(targetId);
                }
            });
        }
    });

    // ######################## B. โค้ดฟังก์ชันอื่น ๆ ########################

    // **ส่วนที่ 2: Love Box (สุ่มอิโมจิและรูปภาพ) + Kiss Animation**
    const sendLoveBtn = document.getElementById('send-love-btn');
    const loveBox = document.getElementById('love-box');
    const kissAnimation = document.getElementById('kiss-animation'); // Element อนิเมชันจุ๊บ

    // NEW: Array สำหรับเก็บ path ของไฟล์ GIF อนิเมชันจุ๊บ
    const kissAnimations = [
        'images/I Love You H.gif', // Path ไปยัง GIF ตัวแรก
        // Path ไปยัง GIF ตัวที่สอง
    ];

    // รวมอิโมจิและ URL รูปภาพใน Array เดียวกัน
    const loveItems = [
        '💖', '❤️', '💕', '🥰', '😘', '😍', '💘', '💜', '🧡', '💛', // อิโมจิเดิม
        // 'images/heart.png',     // ถ้าต้องการเพิ่มรูปภาพเล็กๆ ที่ลอยมาด้วย ให้ใส่ที่นี่
        // 'https://example.com/some_love_icon.png', 
    ];

    function spawnLoveItem() {
        const item = loveItems[Math.floor(Math.random() * loveItems.length)];
        const isImage = item.startsWith('http') || item.includes('/');

        const element = document.createElement(isImage ? 'img' : 'span');

        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 4;

        if (isImage) {
            element.classList.add('falling-image');
            element.src = item;
            element.alt = "Love Item";
            element.style.width = `${Math.random() * 40 + 40}px`;
            element.style.height = 'auto';
        } else {
            element.classList.add('falling-emoji');
            element.textContent = item;
            element.style.fontSize = `${size}em`;
        }

        element.style.left = `${startX}vw`;
        element.style.top = `-50px`;
        element.style.animationDuration = `${duration}s`;

        loveBox.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }

    if (sendLoveBtn) {
        sendLoveBtn.addEventListener('click', () => {
            const count = Math.floor(Math.random() * 50) + 50;
            for (let i = 0; i < count; i++) {
                setTimeout(spawnLoveItem, i * 20);
            }

            // **Logic แสดงอนิเมชันจุ๊บแบบจาง ๆ**
            if (kissAnimation) {
                // 1. สุ่มเลือก GIF
                const randomKissGif = kissAnimations[Math.floor(Math.random() * kissAnimations.length)];

                // 2. NEW: กำหนด background-image และเพิ่ม Cache Buster (Date.now())
                //    การเพิ่ม '?v=' + Date.now() จะบังคับให้บราวเซอร์โหลด GIF ใหม่ทุกครั้ง
                //    ซึ่งเป็นการรีเซ็ตการเล่น GIF ด้วย
                kissAnimation.style.backgroundImage = `url('${randomKissGif}?v=${Date.now()}')`;

                clearTimeout(kissAnimation.timeoutId);

                // 3. แสดงผลทันที
                kissAnimation.classList.add('show');

                // 4. ซ่อนอนิเมชันหลังจากผ่านไป 1.5 วินาที
                kissAnimation.timeoutId = setTimeout(() => {
                    kissAnimation.classList.remove('show');

                    // 5. NEW: รอให้ Transition หายไปแล้วค่อยเคลียร์ background-image 
                    //    เพื่อไม่ให้ GIF ยังคงเล่นอยู่ในหน่วยความจำหลังจากหายไปแล้ว
                    setTimeout(() => {
                        kissAnimation.style.backgroundImage = 'none';
                    }, 600);
                }, 1500);
            }
        });
    }


    // **ส่วนที่ 3: Anniversary Counter (Real-time นับเวลาที่คบกัน - เหมือนเดิม)**
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

    // **ส่วนที่ 4: Custom Anniversary Elapsed Time (นับเวลาที่ผ่านไปจากวันที่กำหนด)**
    const anniversaryDateInput = document.getElementById('anniversary-date-input');
    const setAnniversaryBtn = document.getElementById('set-anniversary-btn');
    const clearAnniversaryBtn = document.getElementById('clear-anniversary-btn');
    const anniversarySetInfo = document.getElementById('anniversary-set-info');
    const customAnniversaryDateDisplay = document.getElementById('custom-anniversary-date-display');

    const STORAGE_KEY_CUSTOM_START = 'customStartTime';

    function saveAnniversaryDate(dateString) {
        localStorage.setItem(STORAGE_KEY_CUSTOM_START, dateString);
        displayAnniversaryDate(dateString);
        updateCustomAnniversaryElapsed();
    }

    function loadAnniversaryDate() {
        return localStorage.getItem(STORAGE_KEY_CUSTOM_START);
    }

    function displayAnniversaryDate(dateString) {
        if (dateString) {
            const date = new Date(dateString + 'T00:00:00');
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            customAnniversaryDateDisplay.textContent = `กำลังนับตั้งแต่: ${date.toLocaleDateString('th-TH', options)}`;
            clearAnniversaryBtn.style.display = 'inline-block';
            anniversarySetInfo.textContent = 'เวลาที่ผ่านไปแล้ว...';
        } else {
            customAnniversaryDateDisplay.textContent = 'ยังไม่ได้ตั้งวันที่เริ่มต้น';
            clearAnniversaryBtn.style.display = 'none';
            anniversarySetInfo.textContent = 'โปรดตั้งค่าวันที่เริ่มต้นเพื่อเริ่มนับเวลาไปข้างหน้า';

            const pad = (num, len = 2) => String(num).padStart(len, '0');
            const elementsToClear = ['custom-years', 'custom-months', 'custom-days', 'custom-hours', 'custom-minutes', 'custom-seconds'];
            elementsToClear.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = pad(0);
            });
        }
    }

    function clearAnniversary() {
        localStorage.removeItem(STORAGE_KEY_CUSTOM_START);
        displayAnniversaryDate(null);
    }

    function updateCustomAnniversaryElapsed() {
        const startDateString = loadAnniversaryDate();
        if (!startDateString) {
            return;
        }

        const startTime = new Date(startDateString + 'T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = now - startTime;

        if (distance < 0) {
            anniversarySetInfo.textContent = 'วันที่เริ่มต้นยังไม่มาถึง!';
            return;
        }

        const pad = (num, len = 2) => String(num).padStart(len, '0');

        let start = new Date(startTime);
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

        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;

        const timeInDay = now - new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();

        const hours = Math.floor((timeInDay % msPerDay) / msPerHour);
        const minutes = Math.floor((timeInDay % msPerHour) / msPerMinute);
        const seconds = Math.floor((timeInDay % msPerMinute) / msPerSecond);

        document.getElementById('custom-years').textContent = pad(years);
        document.getElementById('custom-months').textContent = pad(months);
        document.getElementById('custom-days').textContent = pad(days);
        document.getElementById('custom-hours').textContent = pad(hours);
        document.getElementById('custom-minutes').textContent = pad(minutes);
        document.getElementById('custom-seconds').textContent = pad(seconds);
    }

    if (setAnniversaryBtn) {
        setAnniversaryBtn.addEventListener('click', () => {
            const dateValue = anniversaryDateInput.value;
            if (dateValue) {
                saveAnniversaryDate(dateValue);
            } else {
                alert('กรุณาเลือกวันที่!');
            }
        });
    }

    if (clearAnniversaryBtn) {
        clearAnniversaryBtn.addEventListener('click', clearAnniversary);
    }

    // **ส่วนที่ 5: Birthday Countdown (ส่วนเดิม)**
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

    // **ส่วนที่ 6: Scroll Reveal (ส่วนเดิม)**
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

    // คอมเมนต์: การเรียกใช้ฟังก์ชันเริ่มต้นทั้งหมด
    if (document.getElementById('anniversary-counter')) {
        setInterval(updateAnniversaryCounter, 10);

        const storedDate = loadAnniversaryDate();
        if (storedDate) {
            anniversaryDateInput.value = storedDate;
        }
        displayAnniversaryDate(storedDate);
        setInterval(updateCustomAnniversaryElapsed, 1000);
    }

    if (document.getElementById('birthday-countdown')) {
        updateBirthdayCountdown();
        setInterval(updateBirthdayCountdown, 1000);
    }

    if (mainGallery.classList.contains('active') && document.getElementById('photo-gallery').classList.contains('active')) {
        initScrollAnimation();
    }
});
