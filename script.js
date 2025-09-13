// Birthday Website JavaScript - Enhanced Version with Auto-play

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Show music control button
    createMusicControl();
    
    // Auto-play birthday song immediately
    setTimeout(() => {
        playBirthdaySong();
        showMusicNotification();
    }, 1000);
    
    // Initialize surprise and wish buttons
    initializeSurpriseButton();
    initializeWishButton();
    
    // Add dynamic animations
    addDynamicAnimations();
    
    // Create floating hearts
    createFloatingHearts();
    
    // Add sparkle effect on click
    addSparkleEffect();
    
    // Enable audio context on any user interaction
    enableAudioOnInteraction();
});

// Create music control button
function createMusicControl() {
    const musicBtn = document.createElement('button');
    musicBtn.id = 'musicBtn';
    musicBtn.innerHTML = '🎵 Play Birthday Song';
    musicBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        font-family: 'Comic Sans MS', cursive, sans-serif;
    `;
    
    musicBtn.addEventListener('click', () => {
        playBirthdaySong();
        musicBtn.innerHTML = '🎵 Playing...';
        setTimeout(() => {
            musicBtn.innerHTML = '🎵 Play Again';
        }, 30000); // Song duration
    });
    
    musicBtn.addEventListener('mouseenter', () => {
        musicBtn.style.transform = 'scale(1.05)';
        musicBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    musicBtn.addEventListener('mouseleave', () => {
        musicBtn.style.transform = 'scale(1)';
        musicBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(musicBtn);
}

// Show music notification
function showMusicNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = '🎵 Happy Birthday song is playing! 🎵';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 107, 107, 0.95);
        color: white;
        padding: 12px 18px;
        border-radius: 20px;
        z-index: 999;
        font-size: 13px;
        font-weight: bold;
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 4s forwards;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4500);
}

// Play birthday song function with enhanced auto-play
function playBirthdaySong() {
    const audio = document.getElementById('birthdaySong');
    
    // Try HTML audio first
    if (audio && audio.canPlayType) {
        audio.volume = 0.6;
        audio.currentTime = 0;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Audio playing successfully');
                })
                .catch(error => {
                    console.log('HTML Audio failed, using Web Audio API');
                    createBirthdayMelody();
                });
        }
    } else {
        // Fallback to Web Audio API
        createBirthdayMelody();
    }
}

// Create birthday melody using Web Audio API
function createBirthdayMelody() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Complete Happy Birthday melody with proper timing and notes
        const happyBirthdayMelody = [
            // "Happy Birthday to you" - First line
            { freq: 262, duration: 0.5 },  // C - Hap-
            { freq: 262, duration: 0.5 },  // C - py
            { freq: 294, duration: 1.0 },  // D - Birth-
            { freq: 262, duration: 1.0 },  // C - day
            { freq: 349, duration: 1.0 },  // F - to
            { freq: 330, duration: 2.0 },  // E - you
            { freq: 0, duration: 0.5 },    // Rest
            
            // "Happy Birthday to you" - Second line
            { freq: 262, duration: 0.5 },  // C - Hap-
            { freq: 262, duration: 0.5 },  // C - py
            { freq: 294, duration: 1.0 },  // D - Birth-
            { freq: 262, duration: 1.0 },  // C - day
            { freq: 392, duration: 1.0 },  // G - to
            { freq: 349, duration: 2.0 },  // F - you
            { freq: 0, duration: 0.5 },    // Rest
            
            // "Happy Birthday dear Anjali" - Third line
            { freq: 262, duration: 0.5 },  // C - Hap-
            { freq: 262, duration: 0.5 },  // C - py
            { freq: 523, duration: 1.0 },  // C - Birth-
            { freq: 440, duration: 1.0 },  // A - day
            { freq: 349, duration: 1.0 },  // F - dear
            { freq: 330, duration: 1.0 },  // E - An-
            { freq: 294, duration: 2.0 },  // D - jali
            { freq: 0, duration: 0.5 },    // Rest
            
            // "Happy Birthday to you" - Final line
            { freq: 466, duration: 0.5 },  // Bb - Hap-
            { freq: 466, duration: 0.5 },  // Bb - py
            { freq: 440, duration: 1.0 },  // A - Birth-
            { freq: 349, duration: 1.0 },  // F - day
            { freq: 392, duration: 1.0 },  // G - to
            { freq: 349, duration: 3.0 }   // F - you
        ];
        
        let currentTime = audioContext.currentTime + 0.1;
        const noteDuration = 0.4; // Base duration multiplier
        
        // Play the complete melody
        happyBirthdayMelody.forEach((note, index) => {
            if (note.freq > 0) { // Skip rests
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Use sine wave for softer, pleasant sound
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(note.freq, currentTime);
                
                // Create smooth envelope
                const noteDur = note.duration * noteDuration;
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.1, currentTime + noteDur - 0.1);
                gainNode.gain.linearRampToValueAtTime(0.001, currentTime + noteDur);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + noteDur);
            }
            
            currentTime += note.duration * noteDuration;
        });
        
        // Add celebration sounds after melody
        setTimeout(() => {
            playCelebrationSounds(audioContext);
            createFireworksEffect();
        }, currentTime * 1000);
    }
}

// Add celebration sounds after birthday song
function playCelebrationSounds(audioContext) {
    const celebrationTimes = [0, 0.3, 0.6, 0.9, 1.2];
    
    celebrationTimes.forEach((time, index) => {
        setTimeout(() => {
            // Create cheerful celebration sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Vary the frequencies for different celebration sounds
            const baseFreq = 600 + (index * 100);
            oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, audioContext.currentTime + 0.2);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        }, time * 1000);
    });
}

// Initialize surprise button functionality
function initializeSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surprise = document.getElementById('surprise');
    
    if (surpriseBtn && surprise) {
        surpriseBtn.addEventListener('click', function() {
            surprise.classList.remove('hidden');
            
            // Create burst effect
            createBurstEffect(this);
            
            // Change button text and style
            this.innerHTML = '🌟 You\'re Amazing! 🌟';
            this.style.background = 'linear-gradient(45deg, #f9ca24, #f0932b)';
            
            // Add success sound
            playSuccessSound();
            
            // Smooth scroll to surprise
            setTimeout(() => {
                surprise.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
}

// Initialize wish button functionality
function initializeWishButton() {
    const wishBtn = document.getElementById('wishBtn');
    const wishDiv = document.getElementById('wishDiv');
    const magicBtn = document.getElementById('magicBtn');
    const wishResult = document.getElementById('wishResult');
    
    if (wishBtn && wishDiv) {
        wishBtn.addEventListener('click', function() {
            wishDiv.classList.remove('hidden');
            this.innerHTML = '💫 Make Another Wish! 💫';
            
            setTimeout(() => {
                wishDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
    
    if (magicBtn && wishResult) {
        magicBtn.addEventListener('click', function() {
            // Create magical effect
            createMagicalEffect(this);
            
            // Show wish result
            wishResult.classList.remove('hidden');
            
            // Play magical sound
            playMagicalSound();
            
            // Change button text
            this.innerHTML = '✨ Wish Granted! ✨';
            this.style.background = 'linear-gradient(45deg, #6c5ce7, #a55eea)';
        });
    }
}

// Create burst effect for surprise button
function createBurstEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = getRandomColor();
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        const angle = (i * 24) * Math.PI / 180;
        const distance = 80 + Math.random() * 60;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// Create magical effect for wish button
function createMagicalEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const magicalEmojis = ['✨', '🌟', '💫', '⭐', '🎆'];
    
    for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        star.innerHTML = magicalEmojis[Math.floor(Math.random() * magicalEmojis.length)];
        star.style.position = 'fixed';
        star.style.left = centerX + 'px';
        star.style.top = centerY + 'px';
        star.style.fontSize = '20px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '1000';
        
        document.body.appendChild(star);
        
        const endX = centerX + (Math.random() - 0.5) * 200;
        const endY = centerY - 100 - Math.random() * 100;
        
        star.animate([
            { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            star.remove();
        });
    }
}

// Play success sound
function playSuccessSound() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Create pleasant success sound
        const frequencies = [523, 659, 784]; // C, E, G - major chord
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }
}

// Play magical sound
function playMagicalSound() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Create magical chime sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
    }
}

// Add dynamic animations
function addDynamicAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.photo-card, .message-card, .interactive-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add CSS animations if not exists
    if (!document.querySelector('#dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create floating hearts
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5';
            heart.style.animation = 'floatUp 6s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 6000);
        }
    }, 3000);
    
    // Add CSS for floating hearts
    if (!document.querySelector('#floating-hearts')) {
        const style = document.createElement('style');
        style.id = 'floating-hearts';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add sparkle effect on click
function addSparkleEffect() {
    document.addEventListener('click', function(e) {
        if (!e.target.matches('button, audio')) {
            createSparkle(e.clientX, e.clientY);
        }
    });
}

// Create sparkle at position
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '18px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleEffect 1.2s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1200);
    
    // Add sparkle animation if not exists
    if (!document.querySelector('#sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkleEffect {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create fireworks effect
function createFireworksEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff9ff3'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * (window.innerHeight / 2) + 'px';
            firework.style.width = '6px';
            firework.style.height = '6px';
            firework.style.borderRadius = '50%';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '1000';
            
            document.body.appendChild(firework);
            
            // Animate firework explosion
            firework.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(25)', opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                firework.remove();
            });
        }, i * 300);
    }
}

// Enable audio context on any user interaction
function enableAudioOnInteraction() {
    const enableAudio = () => {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
        
        // Try to play HTML audio as well
        const audio = document.getElementById('birthdaySong');
        if (audio) {
            audio.play().catch(e => console.log('Audio play prevented'));
        }
    };
    
    // Enable on various user interactions
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, enableAudio, { once: true });
    });
}

// Get random color for effects
function getRandomColor() {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', 
        '#6c5ce7', '#ff9ff3', '#54a0ff', '#5f27cd', 
        '#00d2d3', '#ff9f43', '#a55eea', '#26de81'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Auto-trigger celebrations
setTimeout(() => {
    createFireworksEffect();
}, 35000); // After birthday song completes

// Add birthday countdown for future birthdays
function addBirthdayCountdown() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let birthday = new Date(currentYear, 8, 22); // September 22
    
    if (birthday < today) {
        birthday.setFullYear(currentYear + 1);
    }
    
    const timeDiff = birthday.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysLeft > 0 && daysLeft <= 365 && daysLeft !== 365) {
        const countdown = document.createElement('div');
        countdown.innerHTML = `🎂 ${daysLeft} days until next birthday! 🎂`;
        countdown.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 107, 107, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 1000;
            font-size: 14px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(countdown);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (countdown.parentNode) {
                countdown.remove();
            }
        }, 10000);
    }
}

// Call countdown function
addBirthdayCountdown();