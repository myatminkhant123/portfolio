function initPortfolio() {
    let redrawRadarFn = null;

    // ===== DASHBOARD SIDEBAR & ROUTING =====
    const sidebar = document.getElementById('sidebar');
    const navToggle = document.getElementById('navToggle');
    const navProgressFill = document.getElementById('nav-progress-fill');

    // Toggle sidebar on mobile
    if (navToggle && sidebar) {
        // Initial state
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sidebar.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Close sidebar on click outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && (navToggle && !navToggle.contains(e.target))) {
            sidebar.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ── setActiveLink: updates visual + ARIA state on all sidebar links ──
    function setActiveLink(targetId) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            const isActive = link.getAttribute('href') === targetId;
            link.classList.toggle('active', isActive);
            // aria-current="page" for screen readers; remove attribute when inactive
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // ── updateScrollProgress: fills the rail based on scroll within active section ──
    function updateScrollProgress() {
        if (!navProgressFill) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) * 100 : 0;
        navProgressFill.style.height = pct + '%';
    }

    // ── switchSection: core routing function ──
    function switchSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Hide all sections
        document.querySelectorAll('.main-content section').forEach(section => {
            section.classList.remove('active-section');
        });

        // Show target section
        targetSection.classList.add('active-section');

        // Instantly activate reveal effects so user sees them animate immediately
        targetSection.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
            el.classList.add('active');
        });

        // Update active link + aria-current immediately (no waiting)
        setActiveLink(targetId);

        // Close sidebar on mobile after clicking
        if (sidebar) {
            sidebar.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }

        // Reset scroll position to top of section
        window.scrollTo({ top: 0, behavior: 'instant' });
        // Reset progress rail to 0 when switching sections
        updateScrollProgress();
        // Dispatch resize to force hidden canvases to recalculate
        window.dispatchEvent(new Event('resize'));
    }

    // Handle clicks on sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                // Immediately mark as active before section animation starts
                setActiveLink(targetId);
                switchSection(targetId);
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle clicks on in-content links like "View Projects" hero button
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.classList.contains('sidebar-link')) {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection && targetSection.closest('.main-content')) {
                    e.preventDefault();
                    setActiveLink(targetId);
                    switchSection(targetId);
                    history.pushState(null, null, targetId);
                }
            });
        }
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

    // ── Scroll progress rail: updates on scroll within the active section ──
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // initialise

    // ===== INTERACTIVE CUSTOM CURSOR WITH LERP =====
    // Skip entirely on touch/mobile devices (no pointer cursor exists)
    const _isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const cursor = document.getElementById('custom-cursor');
    const glow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    if (!_isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
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
    } else {
        if (cursor) cursor.style.display = 'none';
        if (glow) glow.style.display = 'none';
    }


    // ===== NETWORK TOPOLOGY BACKGROUND CANVAS =====
    const networkCanvas = document.getElementById('network-grid-canvas');
    if (networkCanvas) {
        const nCtx = networkCanvas.getContext('2d');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Detect touch/mobile: no cursor interaction, fewer nodes
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        // ── Config ──────────────────────────────────────────────────────────
        const NODE_COUNT        = isTouchDevice ? 30 : 60;  // halved on mobile
        const CONNECT_DIST      = 150;         // px — max line distance
        const CONNECT_DIST_SQ   = CONNECT_DIST * CONNECT_DIST;
        const NODE_SPEED_MIN    = 0.18;        // px/frame
        const NODE_SPEED_MAX    = 0.55;
        const NODE_RADIUS       = 2.2;         // base dot size
        const NODE_COLOR        = '6, 182, 212';  // cyan RGB components
        const LINE_COLOR        = '6, 182, 212';
        const CURSOR_DIST       = 150;         // cursor interaction radius
        const CURSOR_DIST_SQ    = CURSOR_DIST * CURSOR_DIST;
        const REPEL_STRENGTH    = isTouchDevice ? 0 : 1.8;  // no repel on touch
        const REPEL_DECAY       = 0.88;        // velocity friction for repel
        const PULSE_INTERVAL_MIN = 3500;       // ms between random pulses
        const PULSE_INTERVAL_MAX = 7000;
        const PULSE_DURATION    = 1200;        // ms per pulse

        // ── State ────────────────────────────────────────────────────────────
        let W = 0, H = 0;
        let nodes = [];
        let mouseX = -9999, mouseY = -9999;
        let isTabVisible = !document.hidden;
        let rafId = null;
        let lastTs = 0;

        // ── DPR-aware resize ─────────────────────────────────────────────────
        function resize() {
            const dpr = window.devicePixelRatio || 1;
            W = window.innerWidth;
            H = window.innerHeight;
            networkCanvas.width  = W * dpr;
            networkCanvas.height = H * dpr;
            networkCanvas.style.width  = W + 'px';
            networkCanvas.style.height = H + 'px';
            nCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        // ── Node class ───────────────────────────────────────────────────────
        class Node {
            constructor() { this.reset(true); }

            reset(randomPos) {
                if (randomPos) {
                    this.x = Math.random() * W;
                    this.y = Math.random() * H;
                } else {
                    // Enter from a random edge
                    const edge = Math.floor(Math.random() * 4);
                    if (edge === 0) { this.x = Math.random() * W; this.y = 0; }
                    else if (edge === 1) { this.x = W; this.y = Math.random() * H; }
                    else if (edge === 2) { this.x = Math.random() * W; this.y = H; }
                    else              { this.x = 0;  this.y = Math.random() * H; }
                }
                const speed = NODE_SPEED_MIN + Math.random() * (NODE_SPEED_MAX - NODE_SPEED_MIN);
                const angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.rx = 0; this.ry = 0; // repulsion velocity
                this.baseAlpha = 0.55 + Math.random() * 0.35;
                this.pulseEnd  = 0;        // timestamp when current pulse ends
                this.r = NODE_RADIUS;
            }

            update(now) {
                if (prefersReducedMotion) return;
                // Apply repulsion then decay
                this.rx *= REPEL_DECAY;
                this.ry *= REPEL_DECAY;
                this.x += this.vx + this.rx;
                this.y += this.vy + this.ry;

                // Soft bounce at edges (margin = CONNECT_DIST/2 so connections
                // don't abruptly pop in/out at borders)
                const M = 5;
                if (this.x < M)      { this.x = M;   this.vx = Math.abs(this.vx); }
                if (this.x > W - M)  { this.x = W-M; this.vx = -Math.abs(this.vx); }
                if (this.y < M)      { this.y = M;   this.vy = Math.abs(this.vy); }
                if (this.y > H - M)  { this.y = H-M; this.vy = -Math.abs(this.vy); }
            }

            get isPulsing() { return performance.now() < this.pulseEnd; }

            draw(now) {
                const pulsing = this.isPulsing;
                const pulseProgress = pulsing
                    ? 1 - (this.pulseEnd - now) / PULSE_DURATION
                    : 0;
                // Pulse: grow bright then fade back
                const pulseGlow = pulsing
                    ? Math.sin(pulseProgress * Math.PI) // 0→1→0
                    : 0;
                const alpha = this.baseAlpha + pulseGlow * 0.4;
                const radius = this.r + pulseGlow * 3;

                // Glow halo
                if (pulseGlow > 0.05) {
                    const grad = nCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius * 5);
                    grad.addColorStop(0, `rgba(${NODE_COLOR}, ${pulseGlow * 0.35})`);
                    grad.addColorStop(1, `rgba(${NODE_COLOR}, 0)`);
                    nCtx.beginPath();
                    nCtx.arc(this.x, this.y, radius * 5, 0, Math.PI * 2);
                    nCtx.fillStyle = grad;
                    nCtx.fill();
                }

                // Core dot
                nCtx.beginPath();
                nCtx.arc(this.x, this.y, radius, 0, Math.PI * 2);
                nCtx.fillStyle = `rgba(${NODE_COLOR}, ${Math.min(alpha, 1)})`;
                nCtx.fill();
            }

            triggerPulse() {
                this.pulseEnd = performance.now() + PULSE_DURATION;
            }
        }

        // ── Build nodes ──────────────────────────────────────────────────────
        for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

        // ── Random node pulser ───────────────────────────────────────────────
        function schedulePulse() {
            if (prefersReducedMotion) return;
            const delay = PULSE_INTERVAL_MIN + Math.random() * (PULSE_INTERVAL_MAX - PULSE_INTERVAL_MIN);
            setTimeout(() => {
                if (nodes.length) {
                    nodes[Math.floor(Math.random() * nodes.length)].triggerPulse();
                }
                schedulePulse();
            }, delay);
        }
        schedulePulse();

        // ── Cursor tracking ──────────────────────────────────────────────────
        if (!prefersReducedMotion) {
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            document.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
        }

        // ── Repulsion (throttled — runs only every other frame) ──────────────
        let repelFrame = 0;
        function applyRepulsion() {
            if (mouseX < -1000) return;
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const dx = n.x - mouseX;
                const dy = n.y - mouseY;
                const distSq = dx * dx + dy * dy;
                if (distSq < CURSOR_DIST_SQ && distSq > 0) {
                    const dist = Math.sqrt(distSq);  // only when needed
                    const force = (CURSOR_DIST - dist) / CURSOR_DIST * REPEL_STRENGTH;
                    n.rx += (dx / dist) * force;
                    n.ry += (dy / dist) * force;
                }
            }
        }

        // ── Tab visibility pause ─────────────────────────────────────────────
        document.addEventListener('visibilitychange', () => {
            isTabVisible = !document.hidden;
            if (isTabVisible && !rafId) {
                lastTs = performance.now();
                rafId = requestAnimationFrame(draw);
            }
        });

        // ── Draw connections (cursor as virtual node) ────────────────────────
        function drawConnections() {
            const hasCursor = mouseX > -1000;
            nCtx.lineWidth = 0.7;

            // Node-to-node
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < CONNECT_DIST_SQ) {
                        const alpha = (1 - distSq / CONNECT_DIST_SQ) * 0.18;
                        nCtx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
                        nCtx.beginPath();
                        nCtx.moveTo(a.x, a.y);
                        nCtx.lineTo(b.x, b.y);
                        nCtx.stroke();
                    }
                }
                // Node-to-cursor
                if (hasCursor) {
                    const dx = a.x - mouseX;
                    const dy = a.y - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < CONNECT_DIST_SQ) {
                        const alpha = (1 - distSq / CONNECT_DIST_SQ) * 0.30;
                        nCtx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
                        nCtx.beginPath();
                        nCtx.moveTo(a.x, a.y);
                        nCtx.lineTo(mouseX, mouseY);
                        nCtx.stroke();
                    }
                }
            }
        }

        // ── Draw cursor dot ──────────────────────────────────────────────────
        function drawCursorNode() {
            if (mouseX < -1000) return;
            nCtx.beginPath();
            nCtx.arc(mouseX, mouseY, NODE_RADIUS * 1.4, 0, Math.PI * 2);
            nCtx.fillStyle = `rgba(${NODE_COLOR}, 0.7)`;
            nCtx.fill();
        }

        // ── Main draw loop ───────────────────────────────────────────────────
        function draw(ts) {
            if (!isTabVisible) {
                rafId = null;
                return;
            }
            rafId = requestAnimationFrame(draw);

            const now = performance.now();
            nCtx.clearRect(0, 0, W, H);

            // Throttle repulsion to every other frame
            repelFrame++;
            if (!prefersReducedMotion && repelFrame % 2 === 0) applyRepulsion();

            // Update + draw
            drawConnections();
            for (const node of nodes) {
                node.update(now);
                node.draw(now);
            }
            drawCursorNode();
        }

        // Kick off — static single frame for reduced-motion, loop otherwise
        if (prefersReducedMotion) {
            // Render one static snapshot
            drawConnections();
            for (const node of nodes) node.draw(performance.now());
        } else {
            lastTs = performance.now();
            rafId = requestAnimationFrame(draw);
        }
    }


    // ===== ROLE TYPEWRITER SWITCHER LOOP =====
    const roleText = document.getElementById('role-text');
    const roles = [
        "Data Science Solutions",
        "ML-Powered Systems",
        "Data-Driven Applications",
        "Full-Stack Software"
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
    function animateStatCounter(target) {
        const endVal = parseFloat(target.getAttribute('data-target'));
        const isFloat = endVal % 1 !== 0;
        const noPlus = target.getAttribute('data-no-plus') === 'true';
        const plusSuffix = noPlus ? "" : "+";
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
                target.textContent = isFloat ? endVal.toFixed(1) + plusSuffix : endVal + plusSuffix;
                clearInterval(counter);
                
                // Wait 3 seconds, then restart the counter animation
                setTimeout(() => {
                    animateStatCounter(target);
                }, 3000);
            } else {
                target.textContent = isFloat ? startVal.toFixed(1) + plusSuffix : Math.round(startVal) + plusSuffix;
            }
        }, stepTime);
    }

    const statNums = document.querySelectorAll('.stat-num, .achieve-num');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateStatCounter(target);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => statsObserver.observe(num));

    // ===== CUSTOM INTERACTIVE SKILLS RADAR =====
    const skillsRadar = document.getElementById('skills-radar');
    if (skillsRadar) {
        const rCtx = skillsRadar.getContext('2d');
        const labels = ['Databases', 'Cloud & Ops', 'Programming', 'Web Dev', 'Tools & Systems'];
        const values = [0.95, 0.92, 0.85, 0.80, 0.78]; // Skills percentages
        const pointsCount = labels.length;
        const radius = 120;
        let animatedRadiusScale = 0;

        let hoveredPointIdx = -1;

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

        function drawRoundedRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x, y, width, height, radius);
            } else {
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
            }
            ctx.closePath();
        }

        function drawTooltip(pt, label, value) {
            const text = `${label}: ${Math.round(value * 100)}%`;
            rCtx.font = 'bold 11px Inter, sans-serif';
            const textWidth = rCtx.measureText(text).width;
            const paddingX = 8;
            const tooltipW = textWidth + paddingX * 2;
            const tooltipH = 22;
            const tooltipX = pt.x - tooltipW / 2;
            const tooltipY = pt.y - 32;

            // Draw tooltip background box
            rCtx.fillStyle = document.body.classList.contains('light-theme') ? '#ffffff' : '#0b1120';
            rCtx.strokeStyle = '#06b6d4';
            rCtx.lineWidth = 1;
            drawRoundedRect(rCtx, tooltipX, tooltipY, tooltipW, tooltipH, 4);
            rCtx.fill();
            rCtx.stroke();

            // Draw tooltip text
            rCtx.fillStyle = document.body.classList.contains('light-theme') ? '#1f2937' : '#ffffff';
            rCtx.textAlign = 'center';
            rCtx.textBaseline = 'middle';
            rCtx.fillText(text, pt.x, tooltipY + tooltipH / 2);
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

            // If hover is active, draw tooltip over hovered point
            if (hoveredPointIdx !== -1 && hoveredPointIdx < pts.length) {
                const pt = pts[hoveredPointIdx];
                rCtx.beginPath();
                rCtx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
                rCtx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
                rCtx.lineWidth = 1.5;
                rCtx.stroke();

                drawTooltip(pt, labels[hoveredPointIdx], values[hoveredPointIdx]);
            }
        }

        redrawRadarFn = drawRadar;

        skillsRadar.addEventListener('mousemove', (e) => {
            const rect = skillsRadar.getBoundingClientRect();
            const cssX = (e.clientX - rect.left) * (380 / rect.width);
            const cssY = (e.clientY - rect.top) * (380 / rect.height);

            const pts = getPoints(animatedRadiusScale);
            let foundIdx = -1;
            for (let i = 0; i < pointsCount; i++) {
                const dist = Math.hypot(cssX - pts[i].x, cssY - pts[i].y);
                if (dist < 12) {
                    foundIdx = i;
                    break;
                }
            }

            if (foundIdx !== hoveredPointIdx) {
                hoveredPointIdx = foundIdx;
                drawRadar();
            }
        });

        skillsRadar.addEventListener('mouseleave', () => {
            if (hoveredPointIdx !== -1) {
                hoveredPointIdx = -1;
                drawRadar();
            }
        });

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
            javascript: "JavaScript & MERN Stack: Developing interactive web front-ends with React.js and engineering scalable backend services/APIs with Node.js & Express.",
            html5: "HTML5: Structuring clean semantic layouts with a focus on SEO best practices and page speed optimization.",
            css3: "CSS3: Formulating premium styling patterns, fluid animation keyframes, HSL color tokens, and robust layouts.",
            mssql: "MSSQL Server: Advanced schema engineering, query optimizations, indexing, and enterprise relational database administration.",
            mysql: "MySQL: Managing relational databases, writing queries, and designing scalable schemas for transactional web apps.",
            git: "Git & GitHub: Professional version control, branching strategies, repository management, collaborative PR code reviews, and workflow automation.",
            azure: "Microsoft Azure: Virtual network routing, resource group structures, role-based access lists, and cloud VM provisioning.",
            aks: "AKS (Azure Kubernetes Service): Orchestrating containerized deployments, Kubernetes cluster scaling, network routing, and config management.",
            docker: "Docker: Containerizing environments to guarantee 100% execution consistency from development to cloud hosting.",
            linux: "Linux Systems: System administration, bash shell scripting, job automation, and server patching management.",
            powershell: "PowerShell: Scripting automations, command-line operations, tasks execution, and cloud/Windows infrastructure deployment.",
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
            mssql: "#CC292B",
            mysql: "#00758F",
            git: "#f3f4f6",
            azure: "#0078D4",
            aks: "#326CE5",
            docker: "#2496ED",
            linux: "#FCC624",
            powershell: "#0078D4",
            powerbi: "#F2C811",
            excel: "#107C41",
            servicenow: "#81B924"
        };

        let isLockedOrbit = false;

        function showTechDetails(tech) {
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
        }

        function clearTechDetails() {
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
        }

        // Hover functionality
        orbitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (isLockedOrbit) return;
                const tech = item.getAttribute('data-tech');
                showTechDetails(tech);
                isHoveringOrbit = true;
            });

            item.addEventListener('mouseleave', () => {
                if (isLockedOrbit) return;
                clearTechDetails();
                isHoveringOrbit = false;
            });

            // Touch events for mobile/tablet
            item.addEventListener('touchstart', (e) => {
                e.stopPropagation(); // prevent document touchstart handler from clearing it
                const tech = item.getAttribute('data-tech');
                
                // Toggle lock/unlock if tapping same item
                if (isLockedOrbit && item.classList.contains('locked-active')) {
                    item.classList.remove('locked-active');
                    clearTechDetails();
                    isHoveringOrbit = false;
                    isLockedOrbit = false;
                } else {
                    orbitItems.forEach(el => el.classList.remove('locked-active'));
                    item.classList.add('locked-active');
                    showTechDetails(tech);
                    isHoveringOrbit = true;
                    isLockedOrbit = true;
                }
            });
        });

        // Document-level touchstart to unlock
        document.addEventListener('touchstart', (e) => {
            if (isLockedOrbit) {
                if (!orbitContainer.contains(e.target)) {
                    orbitItems.forEach(el => el.classList.remove('locked-active'));
                    clearTechDetails();
                    isHoveringOrbit = false;
                    isLockedOrbit = false;
                }
            }
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

            // Symmetrically distribute all items around the circle (equally distributed in layout)
            const N = orbitItems.length;
            orbitItems.forEach((item, index) => {
                const theta = (index / N) * Math.PI * 2 + angleOffset;
                
                // Base calculations for x, y
                let x = rx * Math.cos(theta);
                let y = ry * Math.sin(theta);
                
                // Depth effects
                const depth = Math.sin(theta);
                let scale = 0.8 + 0.3 * ((depth + 1) / 2);
                const zIndex = Math.round(10 + 10 * depth);
                const opacity = 0.45 + 0.55 * ((depth + 1) / 2);
                
                // De-emphasize ServiceNow, Excel, and Power BI
                const cat = item.getAttribute('data-category') || 'general';
                if (cat === 'general') {
                    scale *= 0.75;
                    x *= 1.15;
                    y *= 1.15;
                }
                
                item.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;
                
                // Draw connecting dotted line to center
                oBgCtx.strokeStyle = document.body.classList.contains('light-theme') ? 'rgba(0, 0, 0, 0.12)' : 'rgba(6, 182, 212, 0.22)';
                oBgCtx.lineWidth = 1;
                oBgCtx.setLineDash([4, 4]);
                oBgCtx.beginPath();
                oBgCtx.moveTo(centerX, centerY);
                oBgCtx.lineTo(centerX + x, centerY + y);
                oBgCtx.stroke();
            });

            // Increment angle offset (pause or slow down on hover/lock)
            if (isLockedOrbit) {
                // Pause rotation completely
            } else if (isHoveringOrbit) {
                angleOffset += 0.0003;
            } else {
                angleOffset += 0.0018;
            }

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

            // Mobile UA check to show download fallback
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const iframe = document.getElementById('resume-iframe');
            const fallback = document.getElementById('pdf-mobile-fallback');

            if (isMobile && iframe && fallback) {
                iframe.style.display = 'none';
                fallback.style.display = 'block';
            } else if (iframe && fallback) {
                iframe.style.display = 'block';
                fallback.style.display = 'none';
            }
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
        // Add tabindex for keyboard accessibility
        item.setAttribute('tabindex', '0');

        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active-course');
            const parentUl = item.closest('.courses-ul');
            if (parentUl) {
                parentUl.querySelectorAll('.course-item').forEach(c => c.classList.remove('active-course'));
            } else {
                courseItems.forEach(c => c.classList.remove('active-course'));
            }
            if (!isActive) {
                item.classList.add('active-course');
            }
        });

        // Keypress accessibility: enter or space to expand course drawers
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
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
                "• **Data Tools:** Pandas, NumPy, Scikit-Learn, Power BI, Excel\n\n" +
                "🔗 View his work in the [Featured Projects](#projects) section or hover over the [Skills Radar](#skills) to learn more.",
        experience: "Myat has solid hands-on experience in enterprise IT operations and systems:\n\n" +
                    "💼 **AIA Digital +** — *Cloud Operations Intern* (Apr 2026 - Present)\n" +
                    "Assisting in Incident Management, Change Management (drafting monthly Linux patching changes), and performance monitoring using Dynatrace and ServiceNow.\n\n" +
                    "💼 **Print With Sahel** — *Founder & Owner* (Apr 2024 - Feb 2026)\n" +
                    "Managed operations systems, client support, and data analytics to optimize operations.\n\n" +
                    "🔗 View his work timeline in the [Experience Section](#experience) or click to [Download CV PDF](CV_MMK.pdf).",
        status: "📍 **Availability Status:**\n" +
                "• **Target Role:** Software Engineering, Data Analytics, or Cloud Operations (Junior / Entry-level / Industrial Training)\n" +
                "• **Location:** Kuala Lumpur, Malaysia\n" +
                "• **Relocation:** Fully open & flexible to regional/international relocation\n" +
                "• **Availability Timeline:** Starting from **November 2026**\n\n" +
                "🔗 If you would like to hire Myat, send a message in the [Contact Form](#contact).",
        contact: "You can reach Myat directly via these secure channels:\n\n" +
                 "📧 **Email:** mmk111203@gmail.com\n" +
                 "💼 **LinkedIn:** linkedin.com/in/myat-min-khant-810bb3275\n" +
                 "📂 **GitHub:** github.com/myatminkhant123\n\n" +
                 "🔗 Or message him directly via [WhatsApp Direct](https://wa.me/601164597291) or fill in the [Secure SMTP Contact Form](#contact)!",
        education: "Myat is a final-year **Bachelor of Computer Science (Honours)** student at **Albukhary International University** (Oct 2023 - Nov 2026).\n\n" +
                   "• **CGPA Honor:** 3.53\n" +
                   "• **Scholarship:** Albukhary Foundation Full Scholar\n" +
                   "• **Certifications:** IBM Data Analyst, DeepLearning.AI Generative AI for Software Development, and TechNexus Full MERN Stack Bootcamp Certificates\n\n" +
                   "🔗 Credentials verification: [IBM Professional Certificate](https://coursera.org/verify/professional-cert/CLPHAOPC673C), [DeepLearning.AI Professional Certificate](https://coursera.org/verify/professional-cert/TRP5PIXN0JQS), and [TechNexus MERN Stack Bootcamp](technexus_cert.png)."
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
            .replace(/\[(.*?)\]\((.*?)\)/g, (match, linkText, url) => {
                if (url.startsWith('#')) {
                    return `<a href="${url}" class="chat-link scroll-link">${linkText}</a>`;
                }
                return `<a href="${url}" target="_blank" class="chat-link">${linkText}</a>`;
            })
            .replace(/\n/g, '<br>');
        
        msgDiv.innerHTML = formattedText;
        
        // Add scroll-link click listeners to close chatbot and scroll smoothly
        msgDiv.querySelectorAll('.scroll-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSec = document.querySelector(targetId);
                
                if (chatbotWindow) {
                    chatbotWindow.classList.remove('active');
                }
                
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

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

            // Extract variables dynamically from contenteditable fields
            const sequences = {};

            if (fileType === 'ts') {
                const spec1 = document.getElementById('edit-ts-spec1')?.textContent.trim() || 'Software Engineering';
                const spec2 = document.getElementById('edit-ts-spec2')?.textContent.trim() || 'Data Analytics';
                const spec3 = document.getElementById('edit-ts-spec3')?.textContent.trim() || 'Cloud Operations';
                
                sequences.ts = [
                    { text: "$ npx ts-node pipeline.ts", type: "cmd" },
                    { text: "[INFO] Initializing compilation context for developer 'Myat Min Khant'...", type: "info" },
                    { text: `[INFO] Specialties verified: ["${spec1}", "${spec2}", "${spec3}"]`, type: "info" },
                    { text: "[INFO] Running async DataPipeline operations on raw input...", type: "info" },
                    { text: "[SUCCESS] Scalable FullStackApplication successfully deployed to production (scaling: auto, reliability: 99.9%).", type: "success" }
                ];
            } else if (fileType === 'py') {
                const focus1 = document.getElementById('edit-py-focus1')?.textContent.trim() || 'Software Engineering';
                const focus2 = document.getElementById('edit-py-focus2')?.textContent.trim() || 'Data Science';
                
                sequences.py = [
                    { text: "$ python analytics.py", type: "cmd" },
                    { text: "[INFO] Loading Pandas DataFrame pipeline...", type: "info" },
                    { text: `[INFO] Analyzing data patterns: focus set to ["${focus1}", "${focus2}"]`, type: "info" },
                    { text: "[INFO] Running transform_and_analyze() operations...", type: "info" },
                    { text: "[SUCCESS] PortfolioPipeline execution output: FullStackApp deployed. scale_out=True.", type: "success" }
                ];
            } else if (fileType === 'sql') {
                const skill1 = document.getElementById('edit-sql-skill1')?.textContent.trim() || 'Software Engineering';
                const skill2 = document.getElementById('edit-sql-skill2')?.textContent.trim() || 'Data Analytics';
                const skill3 = document.getElementById('edit-sql-skill3')?.textContent.trim() || 'Cloud Operations';
                
                sequences.sql = [
                    { text: "$ psql -f insights.sql", type: "cmd" },
                    { text: "[INFO] Executing SELECT query on database table 'aiu_graduates'...", type: "info" },
                    { text: `[INFO] Filtering constraints: skills IN ('${skill1}', '${skill2}', '${skill3}')`, type: "info" },
                    { text: "[INFO] Fetching records sorted by impact_level DESC...", type: "info" },
                    { text: "[SUCCESS] Query complete: 1 record fetched (Myat Min Khant - Scalable & Reliable Systems) in 42ms.", type: "success" }
                ];
            }

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

    // Typewriter print helper for sequential async terminal logs
    function printFormTerminalLine(text, type) {
        return new Promise((resolve) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = `terminal-line terminal-${type}`;
            formTerminalBody.appendChild(lineDiv);
            
            let charIdx = 0;
            function typeChar() {
                if (charIdx < text.length) {
                    lineDiv.textContent += text[charIdx];
                    charIdx++;
                    formTerminalBody.scrollTop = formTerminalBody.scrollHeight;
                    const delay = type === 'cmd' ? 25 : 12;
                    formTimeouts.push(setTimeout(typeChar, delay));
                } else {
                    formTimeouts.push(setTimeout(resolve, 350));
                }
            }
            typeChar();
        });
    }

    if (contactForm && formTerminalOverlay && formTerminalBody) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const visitorName = document.getElementById('name').value.trim() || 'Visitor';
            const visitorEmail = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Show overlay
            formTerminalOverlay.classList.add('active');
            formTerminalBody.innerHTML = '';
            clearFormTimeouts();

            try {
                await printFormTerminalLine(`$ git push secure-smtp visitor-message --author="${visitorName}"`, 'cmd');
                await printFormTerminalLine("[INFO] Packaging communication payload...", 'info');
                await printFormTerminalLine("[INFO] Connecting to remote server mail.myatminkhant.dev...", 'info');
                await printFormTerminalLine("[INFO] Establishing secure TLS 1.3 channel...", 'info');
                await printFormTerminalLine("[INFO] Transmitting encrypted message payload...", 'info');
                
                // Contact API via Fetch request
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: "d666c9c0-1339-4a3a-9a96-7f74ca7f3018",
                        name: visitorName,
                        email: visitorEmail,
                        subject: subject,
                        message: message
                    })
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                    await printFormTerminalLine(`[SUCCESS] Message successfully delivered to Myat's inbox! Thank you, ${visitorName}!`, 'success');
                    formTimeouts.push(setTimeout(() => {
                        contactForm.reset();
                    }, 1000));
                } else {
                    throw new Error(data.message || "Remote SMTP server rejected credentials check authorization.");
                }
            } catch (error) {
                await printFormTerminalLine(`[ERROR] Transmission failed: ${error.message}`, 'error');
                await printFormTerminalLine("[ERROR] Git push rejected. Secure mail channel closed.", 'error');
            }
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