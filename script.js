document.addEventListener('DOMContentLoaded', () => {

    // ===== DASHBOARD SIDEBAR & ROUTING =====
    const sidebar = document.getElementById('sidebar');
    const navToggle = document.getElementById('navToggle');

    // Toggle sidebar on mobile
    if (navToggle && sidebar) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar on click outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && (navToggle && !navToggle.contains(e.target))) {
            sidebar.classList.remove('active');
        }
    });

    // Switch section logic (Dashboard routing)
    function switchSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Hide all sections
        document.querySelectorAll('.main-content section').forEach(section => {
            section.classList.remove('active-section');
        });

        // Show target section
        targetSection.classList.add('active-section');

        // Instantly activate reveal effects in target section so user sees them animate immediately
        targetSection.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
            el.classList.add('active');
        });

        // Update active class on sidebar links
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // Close sidebar on mobile after clicking
        if (sidebar) {
            sidebar.classList.remove('active');
        }

        // Reset scroll position to top
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Handle clicks on sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                switchSection(targetId);
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle initial load hash router
    function handleHashRoute() {
        const hash = window.location.hash;
        if (hash) {
            switchSection(hash);
        } else {
            switchSection('#home');
        }
    }

    // Listen for hash change / load events
    window.addEventListener('hashchange', handleHashRoute);
    // Execute routing on startup
    handleHashRoute();

    // Click logo to go home
    document.querySelectorAll('.sidebar-logo, .mobile-logo').forEach(logo => {
        logo.addEventListener('click', () => {
            switchSection('#home');
            history.pushState(null, null, '#home');
        });
    });

    // ===== INTERACTIVE CUSTOM CURSOR WITH LERP =====
    const cursor = document.getElementById('custom-cursor');
    const glow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Linear Interpolation (lerp) for smooth trailing
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        if (glow) {
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Hover elements interactions with cursor
    document.querySelectorAll('a, button, .skill-tag, .filter-tab, .project-card, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            if (glow) glow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            if (glow) glow.style.background = 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)';
        });
    });

    // ===== DYNAMIC BACKGROUND PARTICLES CANVAS =====
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        const bgCtx = bgCanvas.getContext('2d');
        let particles = [];
        const maxParticles = 65;

        function resizeBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * bgCanvas.width;
                this.y = Math.random() * bgCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;
            }
            draw() {
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                bgCtx.fillStyle = 'rgba(6, 182, 212, 0.18)';
                bgCtx.fill();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.08;
                        bgCtx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        bgCtx.lineWidth = 0.5;
                        bgCtx.beginPath();
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(particles[j].x, particles[j].y);
                        bgCtx.stroke();
                    }
                }
            }
        }

        function animateBg() {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animateBg);
        }
        requestAnimationFrame(animateBg);
    }

    // ===== ROLE TYPEWRITER SWITCHER LOOP =====
    const roleText = document.getElementById('role-text');
    const roles = [
        "Software Engineer",
        "Data Analyst",
        "AI Engineer",
        "Cloud Operation Generalist"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeRole() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 40;
        } else {
            roleText.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 300; // Pause before starting new word
        }

        setTimeout(typeRole, typeSpeed);
    }
    setTimeout(typeRole, 500);

    // ===== STATS COUNTER AND OBSERVER =====
    const statNums = document.querySelectorAll('.stat-num, .achieve-num');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseFloat(target.getAttribute('data-target'));
                const isFloat = endVal % 1 !== 0;
                let startVal = 0;
                const duration = 1500;
                const steps = 60;
                const stepTime = duration / steps;
                const increment = endVal / steps;
                let step = 0;

                const counter = setInterval(() => {
                    step++;
                    startVal += increment;
                    if (step >= steps) {
                        target.textContent = isFloat ? endVal.toFixed(1) + "+" : endVal + "+";
                        clearInterval(counter);
                    } else {
                        target.textContent = isFloat ? startVal.toFixed(1) + "+" : Math.round(startVal) + "+";
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => statsObserver.observe(num));

    // ===== CUSTOM INTERACTIVE SKILLS RADAR =====
    const skillsRadar = document.getElementById('skills-radar');
    if (skillsRadar) {
        const rCtx = skillsRadar.getContext('2d');
        const labels = ['Programming', 'Web Dev', 'Data & AI', 'Cloud & Ops', 'Tools & Sys'];
        const values = [0.90, 0.85, 0.90, 0.80, 0.85]; // Skills percentages
        const pointsCount = labels.length;
        const radius = 120;
        let animatedRadiusScale = 0;

        function resizeSkillsRadar() {
            const dpr = window.devicePixelRatio || 1;
            skillsRadar.width = 380 * dpr;
            skillsRadar.height = 380 * dpr;
            rCtx.scale(dpr, dpr);
        }
        resizeSkillsRadar();

        const centerX = 190;
        const centerY = 190;

        function getPoints(scale) {
            const points = [];
            for (let i = 0; i < pointsCount; i++) {
                const angle = (Math.PI * 2 / pointsCount) * i - Math.PI / 2;
                const val = values[i] * radius * scale;
                points.push({
                    x: centerX + Math.cos(angle) * val,
                    y: centerY + Math.sin(angle) * val
                });
            }
            return points;
        }

        function drawGrid() {
            // Concentric hexagons
            rCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            rCtx.lineWidth = 1;
            for (let j = 1; j <= 4; j++) {
                const r = radius * (j / 4);
                rCtx.beginPath();
                for (let i = 0; i < pointsCount; i++) {
                    const angle = (Math.PI * 2 / pointsCount) * i - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r;
                    if (i === 0) rCtx.moveTo(x, y);
                    else rCtx.lineTo(x, y);
                }
                rCtx.closePath();
                rCtx.stroke();
            }

            // Axis lines
            rCtx.beginPath();
            for (let i = 0; i < pointsCount; i++) {
                const angle = (Math.PI * 2 / pointsCount) * i - Math.PI / 2;
                rCtx.moveTo(centerX, centerY);
                rCtx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            }
            rCtx.stroke();
        }

        function drawLabels() {
            rCtx.font = '500 11px Inter, sans-serif';
            rCtx.fillStyle = '#9ca3af';
            rCtx.textAlign = 'center';
            rCtx.textBaseline = 'middle';

            for (let i = 0; i < pointsCount; i++) {
                const angle = (Math.PI * 2 / pointsCount) * i - Math.PI / 2;
                const labelX = centerX + Math.cos(angle) * (radius + 24);
                const labelY = centerY + Math.sin(angle) * (radius + 14);
                rCtx.fillText(labels[i], labelX, labelY);
            }
        }

        function drawRadar() {
            rCtx.clearRect(0, 0, 380, 380);
            drawGrid();
            drawLabels();

            const pts = getPoints(animatedRadiusScale);

            // Shape Area Fill
            rCtx.beginPath();
            rCtx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pointsCount; i++) {
                rCtx.lineTo(pts[i].x, pts[i].y);
            }
            rCtx.closePath();
            
            const gradient = rCtx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0.38)');
            rCtx.fillStyle = gradient;
            rCtx.fill();

            // Outline
            rCtx.strokeStyle = '#06b6d4';
            rCtx.lineWidth = 2.5;
            rCtx.stroke();

            // Points indicator dots
            pts.forEach(pt => {
                rCtx.beginPath();
                rCtx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
                rCtx.fillStyle = '#fff';
                rCtx.strokeStyle = '#8b5cf6';
                rCtx.lineWidth = 1.5;
                rCtx.fill();
                rCtx.stroke();
            });
        }

        // Trigger radar animation on enter viewport
        const radarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let start = null;
                    function anim(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        animatedRadiusScale = Math.min(progress / 1000, 1);
                        drawRadar();
                        if (progress < 1000) {
                            requestAnimationFrame(anim);
                        }
                    }
                    requestAnimationFrame(anim);
                    radarObserver.unobserve(skillsRadar);
                }
            });
        }, { threshold: 0.5 });
        radarObserver.observe(skillsRadar);
    }

    // ===== PROJECTS DISPLAY =====
    // Project category filter bar has been removed as requested.
    // All projects are displayed by default.

    // ===== FUTURISTIC CONTACT GEOGRAPHIC MAP CANVAS =====
    const mapCanvas = document.getElementById('map-canvas');
    if (mapCanvas) {
        const mCtx = mapCanvas.getContext('2d');
        let pulseRadius = 0;
        let pulseGrow = true;

        function resizeMap() {
            mapCanvas.width = mapCanvas.parentElement.clientWidth;
            mapCanvas.height = 250;
        }
        resizeMap();
        window.addEventListener('resize', resizeMap);

        // Alor Setar Coordinates relative to layout
        const targetX = mapCanvas.width * 0.5;
        const targetY = mapCanvas.height * 0.48;

        function drawMapGrid() {
            mCtx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            mCtx.lineWidth = 1;

            // Grid lines
            for (let i = 0; i < mapCanvas.width; i += 20) {
                mCtx.beginPath();
                mCtx.moveTo(i, 0);
                mCtx.lineTo(i, mapCanvas.height);
                mCtx.stroke();
            }
            for (let j = 0; j < mapCanvas.height; j += 20) {
                mCtx.beginPath();
                mCtx.moveTo(0, j);
                mCtx.lineTo(mapCanvas.width, j);
                mCtx.stroke();
            }

            // Concentric radar scan lines
            mCtx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
            mCtx.beginPath();
            mCtx.arc(targetX, targetY, 60, 0, Math.PI * 2);
            mCtx.stroke();
            mCtx.beginPath();
            mCtx.arc(targetX, targetY, 120, 0, Math.PI * 2);
            mCtx.stroke();
        }

        function drawRadarPulse() {
            mCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
            drawMapGrid();

            // Pulsating Beacon
            if (pulseGrow) {
                pulseRadius += 0.35;
                if (pulseRadius > 25) pulseGrow = false;
            } else {
                pulseRadius -= 0.35;
                if (pulseRadius < 8) pulseGrow = true;
            }

            // Outer pulse ring
            mCtx.beginPath();
            mCtx.arc(targetX, targetY, pulseRadius, 0, Math.PI * 2);
            mCtx.fillStyle = 'rgba(6, 182, 212, 0.12)';
            mCtx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
            mCtx.lineWidth = 1;
            mCtx.fill();
            mCtx.stroke();

            // Inner solid core
            mCtx.beginPath();
            mCtx.arc(targetX, targetY, 5, 0, Math.PI * 2);
            mCtx.fillStyle = '#06b6d4';
            mCtx.fill();

            // Label Box
            mCtx.font = '600 12px Space Grotesk, sans-serif';
            mCtx.fillStyle = '#f3f4f6';
            mCtx.textAlign = 'center';
            mCtx.fillText('Albukhary International University', targetX, targetY + 35);
            mCtx.font = '500 10px Inter, sans-serif';
            mCtx.fillStyle = '#9ca3af';
            mCtx.fillText('Alor Setar, Kedah, Malaysia (Active Location)', targetX, targetY + 49);

            requestAnimationFrame(drawRadarPulse);
        }
        requestAnimationFrame(drawRadarPulse);
    }



    // ===== SCROLL HIGHLIGHT =====
    // Navigation scroll highlighting is handled directly by the switchSection router.

    // ===== SCROLL REVEAL TRIGGERS =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== TECH STACK MARQUEE & SYNCED BACKGROUND CANVASES =====
    const marqueeContainer = document.getElementById('marquee-container');
    const marqueeWrapper = document.getElementById('marquee-wrapper');
    const marqueeTrack = document.getElementById('marquee-track');
    const marqueeBgCanvas = document.getElementById('marquee-bg-canvas');
    const skillDescBox = document.getElementById('skill-desc-box');
    const skillDescText = document.getElementById('skill-desc-text');
    const infoIcon = skillDescBox ? skillDescBox.querySelector('.info-icon') : null;

    if (marqueeTrack && marqueeBgCanvas && marqueeWrapper) {
        const mBgCtx = marqueeBgCanvas.getContext('2d');
        let isHoveringMarquee = false;
        
        // 1. Duplicate track items for seamless looping
        const trackItems = Array.from(marqueeTrack.children);
        // Duplicate twice to ensure full coverage on wide screens
        for (let j = 0; j < 2; j++) {
            trackItems.forEach(item => {
                const clone = item.cloneNode(true);
                marqueeTrack.appendChild(clone);
            });
        }

        // Tech descriptions mapping
        const techDetails = {
            vscode: "VS Code: Primary IDE. Custom styled with ESLint, Prettier, GitLens, and tailored python/debugging integrations.",
            nlp: "Natural Language Processing: Sentiment analysis models, TF-IDF vectorizers, word tokenization, and LIME transparency integrations.",
            python: "Python: Advanced machine learning (scikit-learn), real-time computer vision (OpenCV), face recognition, and Pandas data mining.",
            java: "Java: Solid object-oriented software engineering principles, system design patterns, and enterprise backend architectures.",
            javascript: "JavaScript: Creating high-performance interactive client experiences and modular Node.js REST API systems.",
            html5: "HTML5: Structuring clean semantic layouts with a focus on SEO best practices and page speed optimization.",
            css3: "CSS3: Formulating premium styling patterns, fluid animation keyframes, HSL color tokens, and robust layouts.",
            sql: "SQL: Advanced schema engineering, normalization, indexing, and indexing query optimizations in PostgreSQL & SQLite.",
            git: "Git: Professional version control, branching strategies, collaborative PR code reviews, and automated CI/CD triggers.",
            react: "React: Developing highly interactive stateful SPAs, customized React Hooks, and responsive web dashboards.",
            nodejs: "Node.js: Engineering scalable runtime servers with Express, JWT authentication, and structured MongoDB access pipelines.",
            docker: "Docker: Containerizing environments to guarantee 100% execution consistency from development to cloud hosting.",
            azure: "Microsoft Azure: Virtual network routing, resource group structures, role-based access lists, and cloud VM provisioning."
        };

        // Brand colors mapping for dynamic hover styles
        const brandColors = {
            vscode: "#007ACC",
            nlp: "#A855F7",
            python: "#3776AB",
            java: "#5382A1",
            javascript: "#F7DF1E",
            html5: "#E34F26",
            css3: "#1572B6",
            sql: "#003B57",
            git: "#F05032",
            react: "#61DAFB",
            nodejs: "#339933",
            docker: "#2496ED",
            azure: "#0078D4"
        };

        // Hover functionality
        const allItems = marqueeTrack.querySelectorAll('.marquee-item');
        allItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const tech = item.getAttribute('data-tech');
                const text = techDetails[tech] || "Exploring premium software engineering capabilities.";
                const color = brandColors[tech] || "var(--cyan)";
                
                if (skillDescText) {
                    skillDescText.style.opacity = '0';
                    setTimeout(() => {
                        skillDescText.textContent = text;
                        skillDescText.style.opacity = '1';
                        skillDescText.style.color = '#ffffff';
                    }, 150);
                }
                
                if (skillDescBox) {
                    skillDescBox.classList.add('active');
                    skillDescBox.style.borderColor = color;
                    skillDescBox.style.boxShadow = `0 0 15px ${color}33`; // 33 is alpha in hex (20%)
                }
                if (infoIcon) {
                    infoIcon.style.color = color;
                    infoIcon.style.transform = 'scale(1.2) rotate(10deg)';
                }
                isHoveringMarquee = true;
            });

            item.addEventListener('mouseleave', () => {
                if (skillDescText) {
                    skillDescText.style.opacity = '0';
                    setTimeout(() => {
                        skillDescText.textContent = "Hover over any technology to explore my experience.";
                        skillDescText.style.opacity = '1';
                        skillDescText.style.color = 'var(--text-muted)';
                    }, 150);
                }
                
                if (skillDescBox) {
                    skillDescBox.classList.remove('active');
                    skillDescBox.style.borderColor = 'var(--glass-border)';
                    skillDescBox.style.boxShadow = 'none';
                }
                if (infoIcon) {
                    infoIcon.style.color = 'var(--cyan)';
                    infoIcon.style.transform = 'scale(1) rotate(0deg)';
                }
                isHoveringMarquee = false;
            });
        });

        // 2. Local background canvas dimensions
        function resizeMarqueeCanvas() {
            marqueeBgCanvas.width = marqueeContainer.clientWidth;
            marqueeBgCanvas.height = marqueeContainer.clientHeight;
        }
        resizeMarqueeCanvas();
        window.addEventListener('resize', resizeMarqueeCanvas);

        // Particle configuration for marquee background
        const marqueeParticles = [];
        const maxMarqueeParticles = 30;
        
        class MarqueeParticle {
            constructor() {
                this.x = Math.random() * marqueeBgCanvas.width;
                this.y = Math.random() * marqueeBgCanvas.height;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0) this.x = marqueeBgCanvas.width;
                if (this.x > marqueeBgCanvas.width) this.x = 0;
                if (this.y < 0) this.y = marqueeBgCanvas.height;
                if (this.y > marqueeBgCanvas.height) this.y = 0;
            }
        }

        for (let i = 0; i < maxMarqueeParticles; i++) {
            marqueeParticles.push(new MarqueeParticle());
        }

        // Marquee Animation Control Variables
        let scrollX = 0;
        let speed = 0.8; 
        let isDragging = false;
        let startX = 0;
        let scrollStartX = 0;
        const parallaxFactor = 0.25; // How fast background moves relative to marquee

        // Drag to scroll handlers
        marqueeWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - marqueeWrapper.offsetLeft;
            scrollStartX = scrollX;
            marqueeWrapper.style.cursor = 'grabbing';
        });

        marqueeWrapper.addEventListener('mouseleave', () => {
            isDragging = false;
            marqueeWrapper.style.cursor = 'grab';
        });

        marqueeWrapper.addEventListener('mouseup', () => {
            isDragging = false;
            marqueeWrapper.style.cursor = 'grab';
        });

        marqueeWrapper.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - marqueeWrapper.offsetLeft;
            const walk = (x - startX) * 1.5; // multiplier for drag sensitivity
            scrollX = scrollStartX - walk;
        });

        // Touch event handlers for mobile
        marqueeWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - marqueeWrapper.offsetLeft;
            scrollStartX = scrollX;
        });

        marqueeWrapper.addEventListener('touchend', () => {
            isDragging = false;
        });

        marqueeWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - marqueeWrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollX = scrollStartX - walk;
        });

        // Animation Loop
        function animateMarquee() {
            // Get single group width (total track width / 3, since we cloned twice)
            const trackWidth = marqueeTrack.scrollWidth;
            const singleGroupWidth = trackWidth / 3;

            // Handle auto-scroll when not dragging and not hovering
            if (!isDragging) {
                if (isHoveringMarquee) {
                    scrollX += speed * 0.15; // Slow down on hover
                } else {
                    scrollX += speed; // Standard auto-scroll speed
                }
            }

            // Infinite loop wrapping logic
            if (scrollX >= singleGroupWidth) {
                scrollX -= singleGroupWidth;
                if (isDragging) scrollStartX -= singleGroupWidth;
            } else if (scrollX < 0) {
                scrollX += singleGroupWidth;
                if (isDragging) scrollStartX += singleGroupWidth;
            }

            // Apply translation to marquee track
            marqueeTrack.style.transform = `translate3d(${-scrollX}px, 0, 0)`;

            // Draw Parallax Canvas Background
            mBgCtx.clearRect(0, 0, marqueeBgCanvas.width, marqueeBgCanvas.height);
            
            // 1. Draw translated grid lines
            const gridSpacing = 40;
            const bgOffsetX = -(scrollX * parallaxFactor) % gridSpacing;
            
            mBgCtx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
            mBgCtx.lineWidth = 1;

            // Vertical grid lines shifting with marquee scroll
            for (let x = bgOffsetX; x < marqueeBgCanvas.width; x += gridSpacing) {
                mBgCtx.beginPath();
                mBgCtx.moveTo(x, 0);
                mBgCtx.lineTo(x, marqueeBgCanvas.height);
                mBgCtx.stroke();
            }

            // Horizontal grid lines
            for (let y = 0; y < marqueeBgCanvas.height; y += gridSpacing) {
                mBgCtx.beginPath();
                mBgCtx.moveTo(0, y);
                mBgCtx.lineTo(marqueeBgCanvas.width, y);
                mBgCtx.stroke();
            }

            // 2. Draw translated particles
            marqueeParticles.forEach(p => {
                p.update();
                
                // Translate the X position based on marquee scrolling
                let drawX = (p.x - (scrollX * parallaxFactor)) % marqueeBgCanvas.width;
                if (drawX < 0) drawX += marqueeBgCanvas.width;

                mBgCtx.beginPath();
                mBgCtx.arc(drawX, p.y, p.radius, 0, Math.PI * 2);
                mBgCtx.fillStyle = 'rgba(6, 182, 212, 0.15)';
                mBgCtx.fill();
            });

            // 3. Draw connections between shifted particles
            for (let i = 0; i < marqueeParticles.length; i++) {
                for (let j = i + 1; j < marqueeParticles.length; j++) {
                    let drawXi = (marqueeParticles[i].x - (scrollX * parallaxFactor)) % marqueeBgCanvas.width;
                    if (drawXi < 0) drawXi += marqueeBgCanvas.width;

                    let drawXj = (marqueeParticles[j].x - (scrollX * parallaxFactor)) % marqueeBgCanvas.width;
                    if (drawXj < 0) drawXj += marqueeBgCanvas.width;

                    const dist = Math.hypot(drawXi - drawXj, marqueeParticles[i].y - marqueeParticles[j].y);
                    if (dist < 100) {
                        const alpha = (1 - dist / 100) * 0.06;
                        mBgCtx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        mBgCtx.lineWidth = 0.5;
                        mBgCtx.beginPath();
                        mBgCtx.moveTo(drawXi, marqueeParticles[i].y);
                        mBgCtx.lineTo(drawXj, marqueeParticles[j].y);
                        mBgCtx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateMarquee);
        }
        
        // Start marquee animation
        requestAnimationFrame(animateMarquee);
    }

    // ===== STATIC GALLERY LIGHTBOX SYSTEM =====
    function initLightbox() {
        const lightbox = document.getElementById("photoLightbox");
        const closeBtn = document.querySelector(".lightbox-close");

        if (closeBtn && lightbox) {
            closeBtn.addEventListener("click", () => {
                lightbox.style.display = "none";
            });
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = "none";
                }
            });
        }
    }

    function openLightbox(imgUrl, caption) {
        const lightbox = document.getElementById("photoLightbox");
        const lightboxImg = document.getElementById("lightboxImage");
        const lightboxCaption = document.getElementById("lightboxCaption");

        if (lightbox && lightboxImg && lightboxCaption) {
            lightbox.style.display = "block";
            lightboxImg.src = imgUrl;
            lightboxCaption.innerText = caption;
        }
    }

    function initStaticGallery() {
        const galleryImgs = document.querySelectorAll(".vol-gallery-item img");
        galleryImgs.forEach(img => {
            img.addEventListener("click", () => {
                openLightbox(img.src, img.alt);
            });
        });
    }

    // Initialize photo features
    initLightbox();
    initStaticGallery();

    console.log('Premium Futuristic Portfolio Loaded successfully! 🛸');
});