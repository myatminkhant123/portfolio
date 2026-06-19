function initPortfolio() {
    let redrawRadarFn = null;

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
        // Dispatch window resize event to force hidden canvases/containers to recalculate client dimensions
        window.dispatchEvent(new Event('resize'));
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
    document.querySelectorAll('a, button, .skill-tag, .filter-tab, .project-card, .cert-card, .interactive-step, .interactive-edu-card').forEach(el => {
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
        "Full-Stack Software engineer",
        "Data Professional",
        "Cloud Operations Engineer"
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
        const labels = ['Programming', 'Web Dev', 'Data Science', 'Cloud & Ops', 'Tools & Sys'];
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
            rCtx.strokeStyle = document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)';
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
            rCtx.fillStyle = document.body.classList.contains('light-theme') ? '#4b5563' : '#9ca3af';
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

        redrawRadarFn = drawRadar;

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

    // ===== TECH STACK ORBIT ENGINE & BACKGROUND CANVASES =====
    const orbitContainer = document.getElementById('orbit-container');
    const orbitRing = document.getElementById('orbit-ring');
    const orbitBgCanvas = document.getElementById('orbit-bg-canvas');
    const skillDescBox = document.getElementById('skill-desc-box');
    const skillDescText = document.getElementById('skill-desc-text');
    const infoIcon = skillDescBox ? skillDescBox.querySelector('.info-icon') : null;

    if (orbitContainer && orbitBgCanvas) {
        const oBgCtx = orbitBgCanvas.getContext('2d');
        const orbitItems = orbitContainer.querySelectorAll('.orbit-item');
        let isHoveringOrbit = false;
        let angleOffset = 0;

        // Tech descriptions mapping
        const techDetails = {
            vscode: "VS Code: Primary IDE. Custom styled with ESLint, Prettier, GitLens, and tailored python/debugging integrations.",
            nlp: "Natural Language Processing: Sentiment analysis models, TF-IDF vectorizers, word tokenization, and model transparency integrations.",
            python: "Python: Data analysis, scripting and automation, database integration, web scraping, and data manipulation using Pandas.",
            java: "Java: Solid object-oriented software engineering principles, system design patterns, and enterprise backend architectures.",
            javascript: "JavaScript: Creating high-performance interactive client experiences and modular Node.js REST API systems.",
            html5: "HTML5: Structuring clean semantic layouts with a focus on SEO best practices and page speed optimization.",
            css3: "CSS3: Formulating premium styling patterns, fluid animation keyframes, HSL color tokens, and robust layouts.",
            sql: "SQL: Advanced schema engineering, normalization, indexing, and indexing query optimizations in PostgreSQL & SQLite.",
            git: "Git: Professional version control, branching strategies, collaborative PR code reviews, and automated CI/CD triggers.",
            react: "React: Developing highly interactive stateful SPAs, customized React Hooks, and responsive web dashboards.",
            nodejs: "Node.js: Engineering scalable runtime servers with Express, JWT authentication, and structured MongoDB access pipelines.",
            docker: "Docker: Containerizing environments to guarantee 100% execution consistency from development to cloud hosting.",
            azure: "Microsoft Azure: Virtual network routing, resource group structures, role-based access lists, and cloud VM provisioning.",
            powerbi: "Power BI: Creating interactive executive business dashboards, advanced DAX queries, data transformations, and scheduled gateway refreshes.",
            excel: "Microsoft Excel: Advanced spreadsheets, pivot tables, VLOOKUP/INDEX-MATCH, VBA macros, and financial data modeling.",
            servicenow: "ServiceNow: Managing IT Service Management (ITSM) workflows, system incidents tracking, asset management, and ticketing pipelines."
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
            azure: "#0078D4",
            powerbi: "#F2C811",
            excel: "#107C41",
            servicenow: "#81B924"
        };

        // Hover functionality
        orbitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const tech = item.getAttribute('data-tech');
                const text = techDetails[tech] || "Exploring premium software engineering capabilities.";
                const color = brandColors[tech] || "var(--cyan)";
                
                if (skillDescText) {
                    skillDescText.style.opacity = '0';
                    setTimeout(() => {
                        skillDescText.textContent = text;
                        skillDescText.style.opacity = '1';
                        skillDescText.style.color = 'var(--text-main)';
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
                isHoveringOrbit = true;
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
                isHoveringOrbit = false;
            });
        });

        // Background canvas dimensions
        function resizeOrbitCanvas() {
            orbitBgCanvas.width = orbitContainer.clientWidth;
            orbitBgCanvas.height = orbitContainer.clientHeight;
        }
        resizeOrbitCanvas();
        window.addEventListener('resize', resizeOrbitCanvas);

        // Particle configuration for background
        const orbitParticles = [];
        const maxParticles = 25;
        
        class OrbitBgParticle {
            constructor() {
                this.x = Math.random() * orbitBgCanvas.width;
                this.y = Math.random() * orbitBgCanvas.height;
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.speedY = (Math.random() - 0.5) * 0.15;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0) this.x = orbitBgCanvas.width;
                if (this.x > orbitBgCanvas.width) this.x = 0;
                if (this.y < 0) this.y = orbitBgCanvas.height;
                if (this.y > orbitBgCanvas.height) this.y = 0;
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            orbitParticles.push(new OrbitBgParticle());
        }

        // Animation Loop
        function animateOrbit() {
            const centerX = orbitContainer.clientWidth / 2;
            const centerY = orbitContainer.clientHeight / 2;
            
            // Adjust radii dynamically based on container size (safeguarded against 0 or negative values)
            const rx = Math.max(80, Math.min(centerX - 85, 420));
            const ry = Math.max(40, Math.min(centerY - 55, 150));

            // Update orbit path line size
            if (orbitRing) {
                orbitRing.style.width = `${rx * 2}px`;
                orbitRing.style.height = `${ry * 2}px`;
            }

            // Update items positions
            const N = orbitItems.length;
            orbitItems.forEach((item, index) => {
                // Symmetrically distribute items around the circle
                const theta = (index / N) * Math.PI * 2 + angleOffset;
                const x = rx * Math.cos(theta);
                const y = ry * Math.sin(theta);
                
                // Depth effects (using sine of theta to simulate 3D projection)
                const depth = Math.sin(theta); // Ranges from -1 (back) to 1 (front)
                
                const scale = 0.8 + 0.3 * ((depth + 1) / 2);
                const zIndex = Math.round(10 + 10 * depth);
                const opacity = 0.45 + 0.55 * ((depth + 1) / 2);
                
                item.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;
            });

            // Increment angle offset (pause or slow down on hover)
            if (isHoveringOrbit) {
                angleOffset += 0.0003;
            } else {
                angleOffset += 0.0018;
            }

            // Draw Background Particles & faint lines
            oBgCtx.clearRect(0, 0, orbitBgCanvas.width, orbitBgCanvas.height);
            
            // Draw grid mapping lines on background
            oBgCtx.strokeStyle = 'rgba(255, 255, 255, 0.006)';
            oBgCtx.lineWidth = 1;
            const gridSpacing = 40;
            for (let x = 0; x < orbitBgCanvas.width; x += gridSpacing) {
                oBgCtx.beginPath();
                oBgCtx.moveTo(x, 0);
                oBgCtx.lineTo(x, orbitBgCanvas.height);
                oBgCtx.stroke();
            }
            for (let y = 0; y < orbitBgCanvas.height; y += gridSpacing) {
                oBgCtx.beginPath();
                oBgCtx.moveTo(0, y);
                oBgCtx.lineTo(orbitBgCanvas.width, y);
                oBgCtx.stroke();
            }

            // Draw drifting stars
            orbitParticles.forEach(p => {
                p.update();
                oBgCtx.beginPath();
                oBgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                oBgCtx.fillStyle = 'rgba(6, 182, 212, 0.12)';
                oBgCtx.fill();
            });

            requestAnimationFrame(animateOrbit);
        }

        requestAnimationFrame(animateOrbit);
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


    // ===== INTERACTIVE RESUME MODAL =====
    const resumeModal = document.getElementById('resumeModal');
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

    function openResumeModal(e) {
        if (e) e.preventDefault();
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeResumeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', openResumeModal);
    }
    if (heroResumeBtn) {
        heroResumeBtn.addEventListener('click', openResumeModal);
    }
    if (closeResumeBtn) {
        closeResumeBtn.addEventListener('click', closeResumeModal);
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });

    // ===== INTERACTIVE COURSE DETAILS ACCORDION =====
    const courseItems = document.querySelectorAll('.courses-ul .course-item');
    courseItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active-course');
            courseItems.forEach(c => c.classList.remove('active-course'));
            if (!isActive) {
                item.classList.add('active-course');
            }
        });
    });

    // ===== INTERACTIVE AI ASSISTANT WIDGET LOGIC =====
    const chatbotTrigger = document.getElementById('chatbotTrigger');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    const botResponses = {
        skills: "Myat specializes in **Software Engineering**, **Data Science & Analytics**, and **Cloud Infrastructure** workflows.\n\n" +
                "🛠️ **Technical Stack:**\n" +
                "• **Languages:** Python, Java, JavaScript, C++, SQL\n" +
                "• **Web Frameworks:** React, Node.js, Express.js\n" +
                "• **Cloud & Systems:** Microsoft Azure, Linux Systems, Docker, Git/GitHub, VS Code\n" +
                "• **Data Tools:** Pandas, NumPy, Scikit-Learn, Power BI, Excel",
        experience: "Myat has solid hands-on experience in enterprise IT operations and systems:\n\n" +
                    "💼 **AIA Digital +** — *Cloud Operations Intern* (Apr 2026 - Present)\n" +
                    "Assisting in Incident Management, Change Management (drafting monthly Linux patching changes), and performance monitoring using Dynatrace and ServiceNow.\n\n" +
                    "💼 **Print With Sahel** — *Founder & Owner* (Apr 2024 - Feb 2026)\n" +
                    "Managed operations systems, client support, and data analytics to optimize operations.",
        status: "📍 **Availability Status:**\n" +
                "• **Target Role:** Software Engineering, Data Analytics, or Cloud Operations (Junior / Entry-level / Industrial Training)\n" +
                "• **Location:** Kuala Lumpur, Malaysia\n" +
                "• **Relocation:** Fully open & flexible to regional/international relocation\n" +
                "• **Availability Timeline:** Starting from **November 2026**",
        contact: "You can reach Myat directly via these secure channels:\n\n" +
                 "📧 **Email:** mmk111203@gmail.com\n" +
                 "💼 **LinkedIn:** linkedin.com/in/myat-min-khant-810bb3275\n" +
                 "📂 **GitHub:** github.com/myatminkhant123\n\n" +
                 "Or scroll down to the contact form on this page to send a secure message!",
        education: "Myat is a final-year **Bachelor of Computer Science (Honours)** student at **Albukhary International University** (Oct 2023 - Nov 2026).\n\n" +
                   "• **CGPA Honor:** 3.53\n" +
                   "• **Scholarship:** Albukhary Foundation Full Scholar\n" +
                   "• **Certifications:** IBM Data Analyst Professional Certificate"
    };

    function toggleChatbot() {
        if (chatbotWindow) {
            chatbotWindow.classList.toggle('active');
            if (chatbotWindow.classList.contains('active') && chatbotInput) {
                chatbotInput.focus();
            }
        }
    }

    function addMessage(text, sender) {
        if (!chatbotMessages) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        msgDiv.innerHTML = formattedText;
        chatbotMessages.appendChild(msgDiv);
        
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    function getBotResponse(userMsg) {
        const text = userMsg.toLowerCase().trim();
        
        if (text.includes('skill') || text.includes('tech') || text.includes('stack') || text.includes('python') || text.includes('code') || text.includes('program')) {
            return botResponses.skills;
        } else if (text.includes('exp') || text.includes('work') || text.includes('job') || text.includes('intern') || text.includes('aia') || text.includes('sahel')) {
            return botResponses.experience;
        } else if (text.includes('status') || text.includes('avail') || text.includes('relocat') || text.includes('timelin') || text.includes('where') || text.includes('locat')) {
            return botResponses.status;
        } else if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('linkedin') || text.includes('github') || text.includes('reach')) {
            return botResponses.contact;
        } else if (text.includes('study') || text.includes('edu') || text.includes('uni') || text.includes('degree') || text.includes('college') || text.includes('cert')) {
            return botResponses.education;
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greet')) {
            return "Hello! I am Myat's virtual assistant. Try asking me about his **skills**, **experience**, **education**, **availability**, or **contact info**!";
        } else {
            return "I can answer questions regarding Myat's **skills**, **experience**, **education**, **availability**, or **contact info**. Feel free to try any of these keywords!";
        }
    }

    function handleUserSend() {
        if (!chatbotInput) return;
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatbotInput.value = '';

        setTimeout(() => {
            const reply = getBotResponse(text);
            addMessage(reply, 'bot');
        }, 600);
    }

    if (chatbotTrigger) {
        chatbotTrigger.addEventListener('click', toggleChatbot);
    }
    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', toggleChatbot);
    }

    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', handleUserSend);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleUserSend();
            }
        });
    }

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const questionKey = chip.getAttribute('data-question');
            const questionText = chip.textContent;
            
            addMessage(questionText, 'user');
            
            setTimeout(() => {
                const reply = botResponses[questionKey] || "I don't have information on that yet.";
                addMessage(reply, 'bot');
            }, 500);
        });
    });

    // ===== INTERACTIVE CODE WINDOW TABS =====
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeContainers = document.querySelectorAll('.code-body-container');
    const terminalWindow = document.getElementById('terminal-window');
    const runCodeBtn = document.getElementById('run-code-btn');

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            codeTabs.forEach(t => t.classList.remove('active'));
            // Hide all code bodies
            codeContainers.forEach(container => container.style.display = 'none');

            // Close terminal if open
            if (terminalWindow) {
                terminalWindow.classList.remove('active');
            }
            clearTimeouts();
            if (runCodeBtn) {
                runCodeBtn.disabled = false;
            }
            isRunningSim = false;

            // Add active class to clicked tab
            tab.classList.add('active');
            // Show corresponding code body
            const fileType = tab.getAttribute('data-file');
            const targetContainer = document.getElementById(`code-${fileType}`);
            if (targetContainer) {
                targetContainer.style.display = 'block';
            }
        });
    });

    // ===== INTERACTIVE TERMINAL SIMULATION =====
    const terminalClose = document.getElementById('terminal-close');
    const terminalBody = document.getElementById('terminal-body');
    let isRunningSim = false;
    let typeTimeouts = [];

    function clearTimeouts() {
        typeTimeouts.forEach(t => clearTimeout(t));
        typeTimeouts = [];
    }

    if (runCodeBtn && terminalWindow && terminalBody) {
        runCodeBtn.addEventListener('click', () => {
            if (isRunningSim) return;
            
            // Disable button during execution
            runCodeBtn.disabled = true;
            isRunningSim = true;

            // Clear previous simulation run
            clearTimeouts();
            terminalWindow.classList.add('active');
            terminalBody.innerHTML = '';

            // Find currently active file type
            const activeTab = document.querySelector('.code-tab.active');
            const fileType = activeTab ? activeTab.getAttribute('data-file') : 'ts';

            const sequences = {
                ts: [
                    { text: "$ npx ts-node pipeline.ts", type: "cmd" },
                    { text: "[INFO] Initializing compilation context for developer 'Myat Min Khant'...", type: "info" },
                    { text: "[INFO] Specialties verified: [\"Software Engineering\", \"Data Analytics\", \"Cloud Operations\"]", type: "info" },
                    { text: "[INFO] Running async DataPipeline operations on raw input...", type: "info" },
                    { text: "[SUCCESS] Scalable FullStackApplication successfully deployed to production (scaling: auto, reliability: 99.9%).", type: "success" }
                ],
                py: [
                    { text: "$ python analytics.py", type: "cmd" },
                    { text: "[INFO] Loading Pandas DataFrame pipeline...", type: "info" },
                    { text: "[INFO] Analyzing data patterns: focus set to [\"Software Engineering\", \"Data Science\"]", type: "info" },
                    { text: "[INFO] Running transform_and_analyze() operations...", type: "info" },
                    { text: "[SUCCESS] PortfolioPipeline execution output: FullStackApp deployed. scale_out=True.", type: "success" }
                ],
                sql: [
                    { text: "$ psql -f insights.sql", type: "cmd" },
                    { text: "[INFO] Executing SELECT query on database table 'aiu_graduates'...", type: "info" },
                    { text: "[INFO] Filtering constraints: skills IN ('Software Engineering', 'Data Analytics', 'Cloud Operations')", type: "info" },
                    { text: "[INFO] Fetching records sorted by impact_level DESC...", type: "info" },
                    { text: "[SUCCESS] Query complete: 1 record fetched (Myat Min Khant - Scalable & Reliable Systems) in 42ms.", type: "success" }
                ]
            };

            const lines = sequences[fileType] || [];
            let lineIdx = 0;

            function printNextLine() {
                if (lineIdx >= lines.length) {
                    // Enable run button again
                    runCodeBtn.disabled = false;
                    isRunningSim = false;
                    return;
                }
                
                const lineData = lines[lineIdx];
                const lineDiv = document.createElement('div');
                lineDiv.className = `terminal-line terminal-${lineData.type}`;
                terminalBody.appendChild(lineDiv);
                
                // Typewriter effect for text
                let charIdx = 0;
                function typeChar() {
                    if (charIdx < lineData.text.length) {
                        lineDiv.textContent += lineData.text[charIdx];
                        charIdx++;
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                        typeTimeouts.push(setTimeout(typeChar, lineData.type === 'cmd' ? 25 : 12));
                    } else {
                        lineIdx++;
                        typeTimeouts.push(setTimeout(printNextLine, 300));
                    }
                }
                typeChar();
            }
            printNextLine();
        });
    }

    if (terminalClose && terminalWindow) {
        terminalClose.addEventListener('click', () => {
            terminalWindow.classList.remove('active');
            clearTimeouts();
            if (runCodeBtn) {
                runCodeBtn.disabled = false;
            }
            isRunningSim = false;
        });
    }

    // ===== 3D TILT HOVER EFFECT FOR PROJECT CARDS =====
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card center (range -0.5 to 0.5)
            const mouseX = (e.clientX - cardRect.left) / cardRect.width - 0.5;
            const mouseY = (e.clientY - cardRect.top) / cardRect.height - 0.5;
            
            // Degrees of rotation (max 10deg)
            const rotateX = -mouseY * 12;
            const rotateY = mouseX * 12;
            
            // Translate slightly towards the user
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ===== CONTACT FORM TERMINAL SIMULATION =====
    const contactForm = document.getElementById('contactForm');
    const formTerminalOverlay = document.getElementById('formTerminalOverlay');
    const formTerminalBody = document.getElementById('formTerminalBody');
    const formTerminalClose = document.getElementById('form-terminal-close');
    let formTimeouts = [];

    function clearFormTimeouts() {
        formTimeouts.forEach(t => clearTimeout(t));
        formTimeouts = [];
    }

    if (contactForm && formTerminalOverlay && formTerminalBody) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const visitorName = document.getElementById('name').value.trim() || 'Visitor';

            // Show overlay
            formTerminalOverlay.classList.add('active');
            formTerminalBody.innerHTML = '';
            clearFormTimeouts();

            const seq = [
                { text: `$ git push secure-smtp visitor-message --author="${visitorName}"`, type: "cmd" },
                { text: "[INFO] Packaging communication payload...", type: "info" },
                { text: "[INFO] Connecting to remote server mail.myatminkhant.dev...", type: "info" },
                { text: "[INFO] Establishing secure TLS 1.3 channel...", type: "info" },
                { text: "[INFO] Verifying SMTP authentication... Status: 250 OK", type: "info" },
                { text: `[SUCCESS] Message successfully delivered to Myat's inbox! Thank you, ${visitorName}!`, type: "success" }
            ];

            let lineIdx = 0;

            function printNextLine() {
                if (lineIdx >= seq.length) {
                    // Reset form after delay
                    formTimeouts.push(setTimeout(() => {
                        contactForm.reset();
                    }, 1000));
                    return;
                }
                
                const lineData = seq[lineIdx];
                const lineDiv = document.createElement('div');
                lineDiv.className = `terminal-line terminal-${lineData.type}`;
                formTerminalBody.appendChild(lineDiv);
                
                // Typewriter effect
                let charIdx = 0;
                function typeChar() {
                    if (charIdx < lineData.text.length) {
                        lineDiv.textContent += lineData.text[charIdx];
                        charIdx++;
                        formTerminalBody.scrollTop = formTerminalBody.scrollHeight;
                        formTimeouts.push(setTimeout(typeChar, lineData.type === 'cmd' ? 25 : 12));
                    } else {
                        lineIdx++;
                        formTimeouts.push(setTimeout(printNextLine, 350));
                    }
                }
                typeChar();
            }
            printNextLine();
        });
    }

    if (formTerminalClose && formTerminalOverlay) {
        formTerminalClose.addEventListener('click', () => {
            formTerminalOverlay.classList.remove('active');
            clearFormTimeouts();
        });
    }

    // ===== DARK/LIGHT THEME SWITCHER =====
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    function toggleTheme() {
        const isLightTheme = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        updateThemeIcons(isLightTheme);
        if (redrawRadarFn) {
            redrawRadarFn();
        }
    }

    function updateThemeIcons(isLight) {
        const toggleButtons = [themeToggleSidebar, themeToggleMobile];
        toggleButtons.forEach(btn => {
            if (btn) {
                const icon = btn.querySelector('i');
                if (icon) {
                    if (isLight) {
                        icon.className = 'fa-solid fa-sun';
                        btn.style.color = '#eab308';
                    } else {
                        icon.className = 'fa-solid fa-moon';
                        btn.style.color = '';
                    }
                }
            }
        });
    }

    if (themeToggleSidebar) themeToggleSidebar.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcons(true);
    }

    console.log('Premium Futuristic Portfolio Loaded successfully! 🛸');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}