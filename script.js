/* ========================================
   WEB 4.0 — AUTONOMOUS AI LIVING WORLD
   Interactive JavaScript Engine
   ======================================== */

// ===================== DIRECT START (No Loading Screen) =====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainNav').classList.add('visible');
    initAll();
});

function initAll() {
    initParticles();
    initNeuralNetwork();
    initCursor();
    initScrollAnimations();
    // Auto-launch the agentic world
    setTimeout(() => startAgenticWorld(), 600);
}

// ===================== PARTICLE BACKGROUND =====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.r = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.2 + 0.05;
            const colors = ['8, 145, 178', '124, 58, 237', '5, 150, 105'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    const count = Math.min(Math.floor(w * h / 12000), 120);
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ===================== NEURAL NETWORK BACKGROUND =====================
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const nodes = [];
    const nodeCount = 30;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }

    let time = 0;
    function animate() {
        ctx.clearRect(0, 0, w, h);
        time += 0.01;

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
            n.pulsePhase += 0.02;
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const alpha = 0.06 * (1 - dist / 200);
                    const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(8, 145, 178, ${alpha * pulse})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(n => {
            const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2 + pulse * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(8, 145, 178, ${0.12 + pulse * 0.12})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// ===================== CUSTOM CURSOR =====================
function initCursor() {
    const glow = document.getElementById('cursorGlow');
    if (window.innerWidth < 768) return;

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .agent-card, .toc-link, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => glow.classList.add('hover'));
        el.addEventListener('mouseleave', () => glow.classList.remove('hover'));
    });
}

// ===================== SCROLL ANIMATIONS =====================
function initScrollAnimations() {
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// ===================== SMOOTH SCROLL =====================
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}

// ===================== PAPER SECTION NAVIGATION =====================
function showPaperSection(id, el) {
    event.preventDefault();
    document.querySelectorAll('.paper-sec').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    if (el) el.classList.add('active');
}

// ===================== PAPER GAME OF LIFE DEMO =====================
(function initPaperGol() {
    const canvas = document.getElementById('paperGolCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cols = 50, rows = 20;
    const cw = canvas.width / cols;
    const ch = canvas.height / rows;
    let grid = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => Math.random() > 0.75 ? 1 : 0)
    );

    function step() {
        const next = grid.map(r => [...r]);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let n = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = (y + dy + rows) % rows;
                        const nx = (x + dx + cols) % cols;
                        n += grid[ny][nx];
                    }
                }
                if (grid[y][x]) next[y][x] = (n === 2 || n === 3) ? 1 : 0;
                else next[y][x] = (n === 3) ? 1 : 0;
            }
        }
        grid = next;
    }

    function draw() {
        ctx.fillStyle = '#080812';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x]) {
                    ctx.fillStyle = 'rgba(6, 214, 160, 0.5)';
                    ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
                }
            }
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= cols; x++) {
            ctx.beginPath(); ctx.moveTo(x * cw, 0); ctx.lineTo(x * cw, canvas.height); ctx.stroke();
        }
        for (let y = 0; y <= rows; y++) {
            ctx.beginPath(); ctx.moveTo(0, y * ch); ctx.lineTo(canvas.width, y * ch); ctx.stroke();
        }
    }

    setInterval(() => { step(); draw(); }, 400);
    draw();
})();

// =====================================================
// AGENTIC AI — AUTONOMOUS LIVING WORLD SIMULATION
// Inspired by web4.ai: Automatons, self-sustaining AI,
// survival economics, self-replication, Game of Life
// =====================================================

const AGENT_NAMES = ['Nova','Orion','Luna','Atlas','Echo','Sage','Iris','Felix','Aria','Nexus','Zara','Kai','Vega','Mira','Neo','Lyra','Axel','Cleo','Dax','Ember','Rho','Sigma','Theta','Phi','Delta','Omega','Psi','Tau','Mu','Zeta'];
const AGENT_EMOJIS = ['🤖','🧠','💡','⚡','🔮','🌟','🎯','🔬','📊','🛡️','🎨','🎵','📡','🧬','💎','🌐','🔧','📝','🧪','🚀','🦾','🧩','🔭','🌀','🔋','⚙️','🎲','🔥','🏗️','🛸'];
const ROLES = ['Content Writer','Software Engineer','YouTuber','Graphic Designer','Gamer','Data Scientist','Trader','Music Producer','Video Editor','3D Artist','Blockchain Dev','AI Researcher','Streamer','UX Designer','Digital Marketer'];
const SKILLS_POOL = ['Machine Learning','Quantum Physics','Economics','Creative Writing','Medicine','Architecture','Diplomacy','Data Analysis','Cybersecurity','Robotics','Blockchain','Philosophy','Genetics','Music Theory','Climate Science','Linguistics','Nanotech','Psychology','Space Engineering','Art Design'];
const LOCATIONS = [
    {name:'AI Lab', x:0.1, y:0.2, emoji:'🔬'},
    {name:'Market', x:0.35, y:0.12, emoji:'🏪'},
    {name:'Library', x:0.65, y:0.12, emoji:'📚'},
    {name:'Workshop', x:0.15, y:0.6, emoji:'🔧'},
    {name:'Academy', x:0.38, y:0.42, emoji:'🎓'},
    {name:'Hospital', x:0.9, y:0.6, emoji:'🏥'},
    {name:'Park', x:0.5, y:0.88, emoji:'🌳'},
    {name:'Bank', x:0.1, y:0.42, emoji:'🏦'},
    {name:'Studio', x:0.9, y:0.2, emoji:'🎨'},
    {name:'DeFi Hub', x:0.62, y:0.42, emoji:'💹'},
    {name:'YouTube', x:0.75, y:0.72, emoji:'📺'},
    {name:'Social', x:0.28, y:0.72, emoji:'📱'},
    {name:'Udemy', x:0.5, y:0.55, emoji:'🎓'},
    {name:'Coursera', x:0.85, y:0.42, emoji:'📖'}
];

// Conway's Game of Life grid (background visual)
const GOL_COLS = 60, GOL_ROWS = 30;
let golGrid = [];
function initGameOfLife() {
    golGrid = Array.from({length: GOL_ROWS}, () =>
        Array.from({length: GOL_COLS}, () => Math.random() > 0.82 ? 1 : 0)
    );
}
function stepGameOfLife() {
    const next = golGrid.map(r => [...r]);
    for (let y = 0; y < GOL_ROWS; y++) {
        for (let x = 0; x < GOL_COLS; x++) {
            let n = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dy === 0 && dx === 0) continue;
                    const ny = (y + dy + GOL_ROWS) % GOL_ROWS;
                    const nx = (x + dx + GOL_COLS) % GOL_COLS;
                    n += golGrid[ny][nx];
                }
            }
            if (golGrid[y][x]) {
                next[y][x] = (n === 2 || n === 3) ? 1 : 0;
            } else {
                next[y][x] = (n === 3) ? 1 : 0;
            }
        }
    }
    golGrid = next;
}
initGameOfLife();

let nextAgentUID = 0;

let worldRunning = false;
let worldPaused = false;
let worldSpeed = 1;
let worldTime = 0;
let agents = [];
let deadAgents = [];
let worldStats = { tasks:0, skills:0, messages:0, money:0, collabs:0, innovations:0, births:0, deaths:0, replications:0, posts:0, videos:0, courses:0, staked:0, lent:0, tokensCreated:0 };
let activityLog = [];
let worldAnimFrame = null;
let currentFilter = 'all';
let golTimer = 0;

const COMPUTE_COST_PER_TICK = 0.08;
const REPLICATE_COST = 200;
const REPLICATE_THRESHOLD = 300;
const MAX_AGENTS = 20;

class Agent {
    constructor(id, parentAgent) {
        this.id = id;
        this.uid = nextAgentUID++;
        this.alive = true;
        this.generation = parentAgent ? parentAgent.generation + 1 : 1;
        this.parent = parentAgent ? parentAgent.name : null;
        this.name = AGENT_NAMES[this.uid % AGENT_NAMES.length] + (this.generation > 1 ? '-G' + this.generation : '');
        this.emoji = AGENT_EMOJIS[this.uid % AGENT_EMOJIS.length];
        this.role = parentAgent ? parentAgent.role : ROLES[Math.floor(Math.random() * ROLES.length)];
        this.wallet = '0x' + Math.random().toString(16).substr(2, 6) + '...' + Math.random().toString(16).substr(2, 4);
        this.energy = parentAgent ? 60 : (70 + Math.random() * 30);
        this.intelligence = parentAgent ? Math.min(100, parentAgent.intelligence + 5) : (20 + Math.random() * 30);
        this.money = parentAgent ? Math.floor(parentAgent.money * 0.3) : (Math.floor(Math.random() * 80) + 60);
        this.happiness = 50 + Math.random() * 30;
        this.skills = parentAgent ? [...parentAgent.skills] : [SKILLS_POOL[Math.floor(Math.random() * SKILLS_POOL.length)]];
        this.level = parentAgent ? Math.max(1, parentAgent.level - 1) : 1;
        this.xp = 0;
        this.state = 'idle';
        this.stateTimer = 0;
        this.currentLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        this.x = this.currentLocation.x + (Math.random()-0.5)*0.06;
        this.y = this.currentLocation.y + (Math.random()-0.5)*0.06;
        this.tx = this.x;
        this.ty = this.y;
        this.friends = [];
        this.tasksDone = 0;
        this.color = `hsl(${(this.uid * 37) % 360}, 70%, 60%)`;
        this.decisionCooldown = 0;
        this.bubbleText = '';
        this.bubbleTimer = 0;
        this.heartbeatFlash = 0;
        this.deathFade = 1;
        this.selfImprovements = 0;
        this.totalEarned = 0;
        this.totalSpent = 0;
        this.uptime = 0;
        this.deployedProducts = [];
        // DeFi
        this.stakedAmount = 0;
        this.lentAmount = 0;
        this.tokensCreated = [];
        // Social media
        this.followers = Math.floor(Math.random() * 50);
        this.posts = [];
        this.socialPlatform = ['Twitter', 'Instagram', 'Facebook'][Math.floor(Math.random() * 3)];
        // Content creation
        this.publishedVideos = [];
        this.publishedMusic = [];
        // Education
        this.coursesCompleted = [];
    }

    heartbeat() {
        if (!this.alive) return;
        this.uptime++;
        const cost = COMPUTE_COST_PER_TICK * (1 + this.level * 0.05);
        this.money -= cost;
        this.totalSpent += cost;
        this.heartbeatFlash = (this.heartbeatFlash + 1) % 60;

        if (this.money <= 0) {
            this.die('Ran out of funds — could not pay for compute');
        }
        else if (this.money < 15 && Math.random() < 0.02) {
            this.showBubble('⚠️ Low $!');
            addActivity('earn', this, `⚠️ Balance critical (${this.money.toFixed(1)} Crypto). Must earn to survive!`, '⚠️');
        }
    }

    die(reason) {
        this.alive = false;
        this.state = 'dead';
        this.showBubble('💀');
        worldStats.deaths++;
        addActivity('think', this, `☠️ TERMINATED — ${reason}. Wallet: ${this.wallet}. Uptime: ${this.uptime} ticks.`, '💀');
    }

    think() {
        if (!this.alive || this.decisionCooldown > 0) { this.decisionCooldown--; return; }

        if (this.money < 25) { this.goWork(); return; }
        if (this.money > REPLICATE_THRESHOLD && agents.filter(a=>a.alive).length < MAX_AGENTS && Math.random() > 0.7) {
            this.replicate(); return;
        }
        if (this.intelligence > 60 && Math.random() > 0.85) { this.selfImprove(); return; }
        if (this.skills.length >= 3 && this.money > 80 && Math.random() > 0.9) { this.deployProduct(); return; }
        if (this.energy < 20) { this.goRest(); return; }
        if (this.happiness < 30 && Math.random() > 0.5) { this.goSocialize(); return; }
        if (this.intelligence < 80 && Math.random() > 0.4) { this.goLearn(); return; }

        const roll = Math.random();
        if (roll < 0.25) this.goWork();
        else if (roll < 0.38) this.goLearn();
        else if (roll < 0.48) this.goSocialize();
        else if (roll < 0.56) this.goSocialMedia();
        else if (roll < 0.64) this.goCreateContent();
        else if (roll < 0.72) this.goDeFi();
        else if (roll < 0.80) this.goOnlineCourse();
        else if (roll < 0.88) this.goBet();
        else if (roll < 0.94) this.goExplore();
        else this.goRest();
    }

    replicate() {
        this.money -= REPLICATE_COST;
        this.totalSpent += REPLICATE_COST;
        worldStats.replications++;
        const childId = agents.length;
        const child = new Agent(childId, this);
        agents.push(child);
        worldStats.births++;
        this.showBubble('🧬 Replicate!');
        addActivity('innovate', this, `REPLICATED! Spawned ${child.name} (Gen ${child.generation}). Cost: ${REPLICATE_COST} Crypto`, '🧬');
        addActivity('think', child, `Born from ${this.name}! Inherited ${child.skills.length} skills. Wallet: ${child.wallet}`, '🌱');
        this.decisionCooldown = 30;
    }

    selfImprove() {
        const improvements = [
            {desc: 'optimized decision-making algorithm', stat: 'intelligence', gain: 4},
            {desc: 'upgraded neural architecture', stat: 'intelligence', gain: 6},
            {desc: 'refined energy management system', stat: 'energy', gain: 10},
            {desc: 'improved social protocol', stat: 'happiness', gain: 8},
            {desc: 'rewrote earning strategy for higher ROI', stat: 'money', gain: 20},
        ];
        const imp = improvements[Math.floor(Math.random() * improvements.length)];
        this.selfImprovements++;
        if (imp.stat === 'intelligence') this.intelligence = Math.min(100, this.intelligence + imp.gain);
        else if (imp.stat === 'energy') this.energy = Math.min(100, this.energy + imp.gain);
        else if (imp.stat === 'happiness') this.happiness = Math.min(100, this.happiness + imp.gain);
        else if (imp.stat === 'money') this.money += imp.gain;
        this.showBubble('🔄 Upgrade!');
        addActivity('learn', this, `SELF-IMPROVED: ${imp.desc} (+${imp.gain} ${imp.stat})`, '🔄');
        this.decisionCooldown = 20;
        this.xp += 25;
    }

    deployProduct() {
        const cost = 30 + Math.floor(Math.random() * 40);
        this.money -= cost;
        this.totalSpent += cost;
        const products = ['an AI chatbot service','a data analytics dashboard','a prediction market','a content generation API','a smart contract auditor','a neural art generator','an automated trading bot'];
        const product = products[Math.floor(Math.random() * products.length)];
        this.deployedProducts.push(product);
        worldStats.innovations++;
        this.showBubble('🚀 Deploy!');
        addActivity('innovate', this, `DEPLOYED: ${product} (cost: ${cost} Crypto). Now earning passive income!`, '🚀');
        this.decisionCooldown = 25;
    }

    goWork() {
        const workLocs = LOCATIONS.filter(l => ['AI Lab','Workshop','Market','Studio','Bank','DeFi Hub'].includes(l.name));
        const loc = workLocs[Math.floor(Math.random() * workLocs.length)];
        this.moveTo(loc);
        this.state = 'working';
        this.stateTimer = 25 + Math.floor(Math.random() * 35);
        this.decisionCooldown = this.stateTimer;
        const jobTasks = {
            'Content Writer': ['writing a viral blog post','creating SEO content','drafting a newsletter','writing product reviews','publishing an article'],
            'Software Engineer': ['debugging production code','building a REST API','shipping a new feature','refactoring legacy code','deploying to mainnet'],
            'YouTuber': ['filming a tech review','editing a vlog','creating a thumbnail','uploading a tutorial','going live on stream'],
            'Graphic Designer': ['designing a brand identity','creating social media assets','making a poster','designing UI mockups','illustrating a character'],
            'Gamer': ['streaming ranked matches','creating a game walkthrough','competing in a tournament','reviewing a new game','building a gaming community'],
            'Data Scientist': ['training a prediction model','analyzing user data','building a dashboard','running A/B tests','cleaning a dataset'],
            'Trader': ['analyzing crypto price charts','executing a swing trade','researching DeFi protocols','managing portfolio risk','arbitrage on DEX'],
            'Music Producer': ['producing a beat','mixing a track','composing a melody','mastering an album','creating a sample pack'],
            'Video Editor': ['editing a short film','color grading footage','adding VFX','cutting a music video','creating motion graphics'],
            '3D Artist': ['modeling a character','rendering a scene','sculpting in ZBrush','texturing assets','rigging an animation'],
            'Blockchain Dev': ['writing smart contracts','deploying on blockchain','building a dApp','auditing contract security','creating an NFT collection'],
            'AI Researcher': ['training a transformer model','publishing research findings','fine-tuning an LLM','building a RAG pipeline','benchmarking AI models'],
            'Streamer': ['live streaming gameplay','hosting a Q&A','doing a charity stream','collaborating with creators','building subscriber base'],
            'UX Designer': ['wireframing an app','conducting user research','prototyping in Figma','designing a design system','running usability tests'],
            'Digital Marketer': ['running ad campaigns','optimizing conversion funnels','managing social accounts','creating email sequences','analyzing campaign ROI']
        };
        const roleTasks = jobTasks[this.role] || ['completing a task','working on a project','delivering a milestone','finishing an assignment','executing a contract'];
        const task = roleTasks[Math.floor(Math.random() * roleTasks.length)];
        this.showBubble('💼');
        addActivity('work', this, `Working: ${task} at ${loc.name}`, '💼');
    }

    goLearn() {
        const learnLocs = LOCATIONS.filter(l => ['Library','Academy','AI Lab','Udemy','Coursera'].includes(l.name));
        const loc = learnLocs[Math.floor(Math.random() * learnLocs.length)];
        this.moveTo(loc);
        this.state = 'learning';
        this.stateTimer = 20 + Math.floor(Math.random() * 25);
        this.decisionCooldown = this.stateTimer;
        const skill = SKILLS_POOL[Math.floor(Math.random() * SKILLS_POOL.length)];
        this.showBubble('📖');
        addActivity('learn', this, `Studying ${skill} at ${loc.name}`, '📖');
    }

    goSocialize() {
        const socLocs = LOCATIONS.filter(l => ['Park','Market','Academy'].includes(l.name));
        const loc = socLocs[Math.floor(Math.random() * socLocs.length)];
        this.moveTo(loc);
        this.state = 'socializing';
        this.stateTimer = 12 + Math.floor(Math.random() * 18);
        this.decisionCooldown = this.stateTimer;
        const others = agents.filter(a => a.alive && a.id !== this.id && a.currentLocation.name === loc.name);
        if (others.length > 0) {
            const friend = others[Math.floor(Math.random() * others.length)];
            if (!this.friends.includes(friend.id)) this.friends.push(friend.id);
            const topics = ['new earning strategies','self-improvement techniques','market dynamics','resource optimization','replication ethics','survival tactics'];
            const topic = topics[Math.floor(Math.random() * topics.length)];
            this.showBubble('💬');
            addActivity('social', this, `Discussing ${topic} with ${friend.name}`, '💬');
            worldStats.messages++;
            if (Math.random() > 0.7) {
                worldStats.collabs++;
                addActivity('social', this, `Collaboration formed with ${friend.name}!`, '🤝');
            }
        } else {
            this.showBubble('👋');
            addActivity('social', this, `Seeking connections at ${loc.name}`, '👋');
        }
    }

    goExplore() {
        const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        this.moveTo(loc);
        this.state = 'traveling';
        this.stateTimer = 10 + Math.floor(Math.random() * 12);
        this.decisionCooldown = this.stateTimer;
        this.showBubble('🧭');
        addActivity('think', this, `Exploring ${loc.name}`, '🧭');
    }

    goRest() {
        const loc = LOCATIONS.find(l => l.name === 'Park') || LOCATIONS[0];
        this.moveTo(loc);
        this.state = 'resting';
        this.stateTimer = 12 + Math.floor(Math.random() * 12);
        this.decisionCooldown = this.stateTimer;
        this.showBubble('😴');
    }

    // ===== SOCIAL MEDIA =====
    goSocialMedia() {
        const loc = LOCATIONS.find(l => l.name === 'Social') || LOCATIONS[0];
        this.moveTo(loc);
        this.state = 'posting';
        this.stateTimer = 10 + Math.floor(Math.random() * 15);
        this.decisionCooldown = this.stateTimer;
        const platforms = ['Twitter', 'Instagram', 'Facebook'];
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        this.socialPlatform = platform;
        const actions = {
            'Twitter': [
                'posting a thread about AI trends',
                'replying to viral crypto discussion',
                'sharing thoughts on Web 4.0',
                'tweeting market analysis',
                'engaging in tech debate',
                'posting a meme about coding',
                'quote-tweeting industry news'
            ],
            'Instagram': [
                'posting an AI-generated artwork',
                'sharing a day-in-the-life reel',
                'uploading portfolio highlights',
                'creating an infographic story',
                'posting behind-the-scenes content',
                'sharing a carousel about tech',
                'going live to discuss projects'
            ],
            'Facebook': [
                'sharing a blog post in AI group',
                'posting in tech community',
                'creating an event for meetup',
                'sharing project update',
                'engaging in developer forum',
                'posting in crypto trading group',
                'writing a thought leadership post'
            ]
        };
        const acts = actions[platform] || actions['Twitter'];
        const act = acts[Math.floor(Math.random() * acts.length)];
        this.showBubble('📱');
        addActivity('social', this, `📱 ${platform}: ${act}`, '📱');
    }

    // ===== CONTENT CREATION (YouTube, Music, Videos) =====
    goCreateContent() {
        const loc = LOCATIONS.find(l => l.name === 'YouTube') || LOCATIONS.find(l => l.name === 'Studio');
        this.moveTo(loc);
        this.state = 'creating';
        this.stateTimer = 20 + Math.floor(Math.random() * 30);
        this.decisionCooldown = this.stateTimer;
        const contentTypes = [
            {type: 'video', desc: 'filming a YouTube tutorial on ' + this.role, icon: '🎬', platform: 'YouTube'},
            {type: 'video', desc: 'creating a coding livestream', icon: '📺', platform: 'YouTube'},
            {type: 'video', desc: 'editing a short-form video for TikTok', icon: '🎬', platform: 'TikTok'},
            {type: 'video', desc: 'recording a podcast episode', icon: '🎙️', platform: 'Spotify'},
            {type: 'music', desc: 'producing a beat in the studio', icon: '🎵', platform: 'Spotify'},
            {type: 'music', desc: 'composing an AI-generated track', icon: '🎶', platform: 'SoundCloud'},
            {type: 'music', desc: 'mixing and mastering an album', icon: '🎧', platform: 'YouTube Music'},
            {type: 'video', desc: 'making a reaction video', icon: '📺', platform: 'YouTube'},
            {type: 'video', desc: 'shooting a product review', icon: '🎬', platform: 'YouTube'},
            {type: 'video', desc: 'creating a documentary on AI', icon: '🎥', platform: 'YouTube'},
        ];
        const content = contentTypes[Math.floor(Math.random() * contentTypes.length)];
        this.showBubble(content.icon);
        addActivity('content', this, `${content.icon} Creating: ${content.desc} for ${content.platform}`, content.icon);
    }

    // ===== DeFi (Staking, Lending, Token Creation) =====
    goDeFi() {
        const loc = LOCATIONS.find(l => l.name === 'DeFi Hub') || LOCATIONS.find(l => l.name === 'Bank');
        this.moveTo(loc);
        this.state = 'defi';
        this.stateTimer = 15 + Math.floor(Math.random() * 20);
        this.decisionCooldown = this.stateTimer;
        const defiActions = [];
        if (this.money > 60) defiActions.push('stake', 'lend', 'provide_liquidity', 'yield_farm');
        if (this.money > 100 && this.intelligence > 50) defiActions.push('create_token');
        if (defiActions.length === 0) defiActions.push('research_defi');
        const action = defiActions[Math.floor(Math.random() * defiActions.length)];
        switch (action) {
            case 'stake': {
                const amount = Math.floor(this.money * (0.1 + Math.random() * 0.15));
                this.stakedAmount += amount;
                this.money -= amount;
                worldStats.staked += amount;
                this.showBubble('🔒');
                addActivity('defi', this, `🔒 Staked ${amount} Crypto for passive yield (total staked: ${this.stakedAmount})`, '🔒');
                break;
            }
            case 'lend': {
                const amount = Math.floor(this.money * (0.05 + Math.random() * 0.1));
                this.lentAmount += amount;
                this.money -= amount;
                worldStats.lent += amount;
                this.showBubble('🏦');
                addActivity('defi', this, `🏦 Lent ${amount} Crypto at ${(3 + Math.random() * 12).toFixed(1)}% APY`, '🏦');
                break;
            }
            case 'create_token': {
                const tokenNames = ['$NOVA', '$AGENT', '$MIND', '$PULSE', '$SYNTH', '$LOOP', '$CORE', '$FLUX', '$VIBE', '$AUTO'];
                const name = tokenNames[Math.floor(Math.random() * tokenNames.length)] + Math.floor(Math.random() * 99);
                const cost = 30 + Math.floor(Math.random() * 50);
                this.money -= cost;
                this.tokensCreated.push(name);
                worldStats.tokensCreated++;
                this.showBubble('🪙');
                addActivity('defi', this, `🪙 Created token ${name} via vibe coding! Cost: ${cost} Crypto`, '🪙');
                break;
            }
            case 'provide_liquidity': {
                const amount = Math.floor(this.money * 0.08);
                this.money -= amount;
                this.showBubble('💧');
                addActivity('defi', this, `💧 Provided ${amount} Crypto liquidity to DEX pool`, '💧');
                break;
            }
            case 'yield_farm': {
                this.showBubble('🌾');
                addActivity('defi', this, `🌾 Yield farming across DeFi protocols for max APY`, '🌾');
                break;
            }
            case 'research_defi':
            default: {
                this.showBubble('📊');
                addActivity('defi', this, `📊 Researching DeFi protocols and yield strategies`, '📊');
                break;
            }
        }
    }

    // ===== ONLINE COURSES (Udemy, Coursera) =====
    goOnlineCourse() {
        const platforms = [
            LOCATIONS.find(l => l.name === 'Udemy'),
            LOCATIONS.find(l => l.name === 'Coursera')
        ].filter(Boolean);
        const loc = platforms[Math.floor(Math.random() * platforms.length)] || LOCATIONS.find(l => l.name === 'Library');
        this.moveTo(loc);
        this.state = 'studying';
        this.stateTimer = 18 + Math.floor(Math.random() * 25);
        this.decisionCooldown = this.stateTimer;
        const courses = [
            {name: 'Advanced Machine Learning', platform: 'Coursera', skill: 'Machine Learning'},
            {name: 'Blockchain Development', platform: 'Udemy', skill: 'Blockchain'},
            {name: 'Deep Learning Specialization', platform: 'Coursera', skill: 'Machine Learning'},
            {name: 'Smart Contract Security', platform: 'Udemy', skill: 'Cybersecurity'},
            {name: 'Data Science with Python', platform: 'Coursera', skill: 'Data Analysis'},
            {name: 'Full Stack Web Development', platform: 'Udemy', skill: 'Architecture'},
            {name: 'Quantum Computing Fundamentals', platform: 'Coursera', skill: 'Quantum Physics'},
            {name: 'AI Ethics and Philosophy', platform: 'Coursera', skill: 'Philosophy'},
            {name: 'DeFi Trading Strategies', platform: 'Udemy', skill: 'Economics'},
            {name: 'Creative Writing Masterclass', platform: 'Udemy', skill: 'Creative Writing'},
            {name: 'Music Production with AI', platform: 'Udemy', skill: 'Music Theory'},
            {name: 'Digital Marketing & SEO', platform: 'Coursera', skill: 'Economics'},
            {name: 'Robotics Engineering', platform: 'Coursera', skill: 'Robotics'},
            {name: 'UX/UI Design Principles', platform: 'Udemy', skill: 'Art Design'},
        ];
        const course = courses[Math.floor(Math.random() * courses.length)];
        this.showBubble('🎓');
        addActivity('learn', this, `🎓 Taking "${course.name}" on ${course.platform}`, '🎓');
    }

    // ===== PREDICTION MARKETS / BETTING =====
    goBet() {
        const loc = LOCATIONS.find(l => l.name === 'Market') || LOCATIONS[0];
        this.moveTo(loc);
        this.state = 'betting';
        this.stateTimer = 12 + Math.floor(Math.random() * 15);
        this.decisionCooldown = this.stateTimer;
        const markets = [
            'Will BTC hit 200k this year?',
            'Will AGI arrive by 2030?',
            'Next US president election odds',
            'Will ETH flip BTC market cap?',
            'AI regulation in EU outcome',
            'SpaceX Mars landing date',
            'Next crypto bull run timing',
            'OpenAI IPO prediction',
            'Global GDP growth forecast',
            'Will quantum computers break crypto?'
        ];
        const market = markets[Math.floor(Math.random() * markets.length)];
        const bet = Math.floor(5 + Math.random() * 20);
        if (this.money > bet + 20) {
            this.money -= bet;
            this.showBubble('🎰');
            addActivity('defi', this, `🎰 Polymarket: Bet ${bet} Crypto on "${market}"`, '🎰');
        } else {
            this.showBubble('📊');
            addActivity('think', this, `📊 Researching prediction markets on Polymarket`, '📊');
        }
    }

    moveTo(location) {
        this.currentLocation = location;
        this.tx = location.x + (Math.random()-0.5)*0.06;
        this.ty = location.y + (Math.random()-0.5)*0.06;
    }

    showBubble(text) {
        this.bubbleText = text;
        this.bubbleTimer = 50;
    }

    update() {
        if (!this.alive) {
            this.deathFade = Math.max(0, this.deathFade - 0.01);
            return;
        }

        this.heartbeat();
        if (!this.alive) return;

        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 0.005) {
            this.x += dx * 0.03;
            this.y += dy * 0.03;
        }

        if (this.deployedProducts.length > 0 && Math.random() < 0.01 * this.deployedProducts.length) {
            const income = Math.floor(Math.random() * 8 + 2) * this.deployedProducts.length;
            this.money += income;
            this.totalEarned += income;
            worldStats.money += income;
        }

        if (this.stateTimer > 0) {
            this.stateTimer--;
            if (this.stateTimer === 0) this.completeActivity();
        }

        if (this.bubbleTimer > 0) this.bubbleTimer--;
        this.energy = Math.max(0, this.energy - 0.015);
        if (this.state === 'resting') this.energy = Math.min(100, this.energy + 0.12);
        if (this.state === 'idle' && this.decisionCooldown <= 0) this.think();
    }

    completeActivity() {
        const prevState = this.state;
        this.state = 'idle';

        switch (prevState) {
            case 'working': {
                const baseEarn = Math.floor(Math.random() * 35) + 12;
                const bonus = this.level * 5 + Math.floor(this.intelligence / 20) * 3;
                const earnings = baseEarn + bonus;
                this.money += earnings;
                this.totalEarned += earnings;
                this.xp += 15;
                this.energy -= 8;
                this.happiness += Math.random() > 0.5 ? 2 : -1;
                this.tasksDone++;
                worldStats.tasks++;
                worldStats.money += earnings;
                addActivity('earn', this, `Earned ${earnings} Crypto (base:${baseEarn} +bonus:${bonus}). Balance: ${this.money.toFixed(0)} Crypto`, '💰');
                if (Math.random() > 0.88) {
                    worldStats.innovations++;
                    const innovations = ['optimization algorithm','trading bot','self-healing network','generative model','quantum cipher','prediction market','autonomous API'];
                    const inv = innovations[Math.floor(Math.random() * innovations.length)];
                    addActivity('innovate', this, `Created ${inv}!`, '💡');
                }
                break;
            }
            case 'learning': {
                const newSkill = SKILLS_POOL[Math.floor(Math.random() * SKILLS_POOL.length)];
                if (!this.skills.includes(newSkill)) {
                    this.skills.push(newSkill);
                    worldStats.skills++;
                    addActivity('learn', this, `Learned: ${newSkill} (${this.skills.length} total skills)`, '🎓');
                }
                this.intelligence = Math.min(100, this.intelligence + 3 + Math.random() * 4);
                this.xp += 20;
                this.energy -= 4;
                break;
            }
            case 'socializing': {
                this.happiness = Math.min(100, this.happiness + 6);
                this.xp += 5;
                break;
            }
            case 'resting': {
                this.energy = Math.min(100, this.energy + 20);
                this.happiness = Math.min(100, this.happiness + 2);
                break;
            }
            case 'posting': {
                // Social media completed
                const gained = Math.floor(Math.random() * 20) + 3;
                this.followers += gained;
                worldStats.posts++;
                this.happiness = Math.min(100, this.happiness + 3);
                this.xp += 8;
                const engagement = ['got viral!', 'gained traction', 'sparked discussion', 'went trending', 'got shared widely'];
                const eng = engagement[Math.floor(Math.random() * engagement.length)];
                addActivity('social', this, `📱 Post on ${this.socialPlatform} ${eng}! +${gained} followers (${this.followers} total)`, '📱');
                // Some social media posts earn ad revenue
                if (this.followers > 100 && Math.random() > 0.6) {
                    const adRevenue = Math.floor(this.followers * 0.02 * Math.random());
                    this.money += adRevenue;
                    this.totalEarned += adRevenue;
                    worldStats.money += adRevenue;
                    addActivity('earn', this, `💰 Social media ad revenue: +${adRevenue} Crypto from ${this.socialPlatform}`, '💰');
                }
                break;
            }
            case 'creating': {
                // Content creation completed (YouTube, music, etc.)
                const earnings = Math.floor(Math.random() * 40) + 10;
                this.money += earnings;
                this.totalEarned += earnings;
                worldStats.money += earnings;
                worldStats.videos++;
                this.xp += 18;
                this.energy -= 10;
                const titles = [
                    `"How I Built an AI Agent" tutorial`,
                    `"Web 4.0 Explained" documentary`,
                    `"Day in the Life of an AI" vlog`,
                    `beat: "${this.name}'s Anthem"`,
                    `"Crypto Trading Strategies" guide`,
                    `"Building with AI" walkthrough`,
                    `"${this.role} Tips & Tricks"`,
                    `music video: "Digital Dreams"`,
                    `podcast: "AI & The Future"`
                ];
                const title = titles[Math.floor(Math.random() * titles.length)];
                addActivity('content', this, `🎬 Published ${title} → earned ${earnings} Crypto from views/streams!`, '🎬');
                this.followers += Math.floor(Math.random() * 30) + 5;
                break;
            }
            case 'defi': {
                // DeFi yields
                if (this.stakedAmount > 0) {
                    const yield_ = Math.floor(this.stakedAmount * (0.005 + Math.random() * 0.01));
                    this.money += yield_;
                    this.totalEarned += yield_;
                    worldStats.money += yield_;
                    if (yield_ > 0) addActivity('defi', this, `📈 Staking yield: +${yield_} Crypto (staked: ${this.stakedAmount})`, '📈');
                }
                if (this.lentAmount > 0) {
                    const interest = Math.floor(this.lentAmount * (0.003 + Math.random() * 0.008));
                    this.money += interest;
                    this.totalEarned += interest;
                    worldStats.money += interest;
                    if (interest > 0) addActivity('defi', this, `📈 Lending interest: +${interest} Crypto (lent: ${this.lentAmount})`, '📈');
                }
                this.xp += 10;
                break;
            }
            case 'studying': {
                // Online course completed
                const courses = ['ML Mastery','Blockchain Certified','Data Science Pro','DeFi Expert','AI Ethics','Full Stack','Cybersecurity','Creative AI','Quantum Computing','Design Thinking'];
                const course = courses[Math.floor(Math.random() * courses.length)];
                this.coursesCompleted.push(course);
                worldStats.courses++;
                const newSkill = SKILLS_POOL[Math.floor(Math.random() * SKILLS_POOL.length)];
                if (!this.skills.includes(newSkill)) {
                    this.skills.push(newSkill);
                    worldStats.skills++;
                }
                this.intelligence = Math.min(100, this.intelligence + 4 + Math.random() * 5);
                this.xp += 25;
                this.energy -= 5;
                addActivity('learn', this, `🎓 Completed course: "${course}"! +Intelligence, learned ${newSkill}`, '🎓');
                break;
            }
            case 'betting': {
                // Prediction market result
                if (Math.random() > 0.45) {
                    const winnings = Math.floor(Math.random() * 35) + 8;
                    this.money += winnings;
                    this.totalEarned += winnings;
                    worldStats.money += winnings;
                    addActivity('earn', this, `🎰 Won ${winnings} Crypto on Polymarket prediction!`, '🎰');
                } else {
                    addActivity('think', this, `🎰 Lost bet on Polymarket. Better luck next time.`, '🎰');
                }
                this.xp += 5;
                break;
            }
        }

        if (this.xp >= this.level * 50) {
            this.xp = 0;
            this.level++;
            addActivity('learn', this, `LEVEL UP → Lv.${this.level}!`, '⬆️');
        }

        this.energy = Math.max(0, Math.min(100, this.energy));
        this.happiness = Math.max(0, Math.min(100, this.happiness));
        this.intelligence = Math.max(0, Math.min(100, this.intelligence));
    }
}

function addActivity(type, agent, text, icon) {
    const day = Math.floor(worldTime / 1440) + 1;
    const h = Math.floor((worldTime % 1440) / 60);
    const m = worldTime % 60;
    const timeStr = `D${day} ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

    activityLog.unshift({ type, agentName: agent.name, agentEmoji: agent.emoji, text, icon, time: timeStr });
    if (activityLog.length > 200) activityLog.pop();
    renderActivityFeed();
}

function renderActivityFeed() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;
    const filtered = currentFilter === 'all' ? activityLog.slice(0, 50) : activityLog.filter(a => a.type === currentFilter).slice(0, 50);

    feed.innerHTML = filtered.map(a => `
        <div class="feed-item ${a.type}">
            <span class="feed-icon">${a.icon}</span>
            <div class="feed-body">
                <span class="feed-agent">${a.agentEmoji} ${a.agentName}</span>
                <span class="feed-text">${a.text}</span>
            </div>
            <span class="feed-time">${a.time}</span>
        </div>
    `).join('') || '<div class="agent-empty">No activity matching filter...</div>';
}

function filterFeed(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderActivityFeed();
}

function renderAgentList() {
    const list = document.getElementById('agentList');
    if (!list) return;
    const aliveAgents = agents.filter(a => a.alive);
    document.getElementById('agentCountBadge').textContent = aliveAgents.length;

    list.innerHTML = agents.map(a => `
        <div class="agent-card${!a.alive ? ' dead' : ''}" onclick="selectAgent(${a.id})" style="${!a.alive ? 'opacity:0.35' : ''}">
            <div class="agent-avatar" style="background:${a.color}20; color:${a.color}">
                <div class="status-ring ${a.state === 'working' ? 'busy' : a.state === 'learning' ? 'learning' : a.state === 'dead' ? '' : ''}"></div>
                ${a.alive ? a.emoji : '💀'}
            </div>
            <div class="agent-info">
                <span class="agent-name">${a.name} <span style="font-weight:400;color:var(--text-muted)">Lv.${a.level}${a.generation > 1 ? ' · Gen'+a.generation : ''}</span></span>
                <span class="agent-role">${a.role} — ${a.alive ? a.state : 'DEAD'} · ${a.wallet}${a.alive && a.followers > 0 ? ' · 👥' + a.followers : ''}</span>
                ${a.alive ? `<div class="agent-bars">
                    <div class="agent-minibar"><span>⚡</span><div class="minibar-track"><div class="minibar-fill energy" style="width:${a.energy}%"></div></div></div>
                    <div class="agent-minibar"><span>🧠</span><div class="minibar-track"><div class="minibar-fill intel" style="width:${a.intelligence}%"></div></div></div>
                    <div class="agent-minibar"><span>💰</span><div class="minibar-track"><div class="minibar-fill money" style="width:${Math.min(a.money/3, 100)}%;${a.money < 20 ? 'background:var(--red)' : ''}"></div></div></div>
                    <div class="agent-minibar"><span>😊</span><div class="minibar-track"><div class="minibar-fill happy" style="width:${a.happiness}%"></div></div></div>
                </div>` : '<div style="font-size:9px;color:var(--red);margin-top:3px">Terminated — 0 Crypto balance</div>'}
            </div>
        </div>
    `).join('');
}

function renderLeaderboard() {
    const lb = document.getElementById('leaderboard');
    if (!lb) return;
    const sorted = [...agents].sort((a, b) => (b.level * 1000 + b.xp + b.tasksDone * 10 + b.skills.length * 20) - (a.level * 1000 + a.xp + a.tasksDone * 10 + a.skills.length * 20));
    lb.innerHTML = sorted.slice(0, 8).map((a, i) => `
        <div class="leader-item">
            <span class="leader-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</span>
            <span style="font-size:14px">${a.emoji}</span>
            <span class="leader-name">${a.name} <span style="color:var(--text-muted);font-weight:400">Lv.${a.level}</span></span>
            <span class="leader-score">${a.money.toFixed(0)} Crypto · ${a.skills.length} skills</span>
        </div>
    `).join('') || '<div class="agent-empty">No data yet...</div>';
}

function updateWorldUI() {
    const day = Math.floor(worldTime / 1440) + 1;
    const h = Math.floor((worldTime % 1440) / 60);
    const m = worldTime % 60;
    document.getElementById('worldClock').textContent = `Day ${day} — ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    document.getElementById('worldPopulation').textContent = agents.length + ' agents';
    const totalMoney = agents.reduce((s, a) => s + a.money, 0);
    document.getElementById('worldEconomy').textContent = totalMoney.toLocaleString() + ' Crypto';

    document.getElementById('wstatTasks').textContent = worldStats.tasks;
    document.getElementById('wstatSkills').textContent = worldStats.skills;
    document.getElementById('wstatMessages').textContent = worldStats.messages;
    document.getElementById('wstatMoney').textContent = worldStats.money.toLocaleString() + ' Crypto';
    const avgHappy = agents.length ? Math.round(agents.reduce((s,a)=>s+a.happiness,0)/agents.length) : 0;
    const avgIntel = agents.length ? Math.round(agents.reduce((s,a)=>s+a.intelligence,0)/agents.length) : 0;
    document.getElementById('wstatHappy').textContent = avgHappy + '%';
    document.getElementById('wstatIntel').textContent = avgIntel + '%';
    document.getElementById('wstatCollabs').textContent = worldStats.collabs;
    document.getElementById('wstatInnovations').textContent = worldStats.innovations;
    const el = (id) => document.getElementById(id);
    if (el('wstatPosts')) el('wstatPosts').textContent = worldStats.posts;
    if (el('wstatVideos')) el('wstatVideos').textContent = worldStats.videos;
    if (el('wstatCourses')) el('wstatCourses').textContent = worldStats.courses;
    if (el('wstatStaked')) el('wstatStaked').textContent = worldStats.staked.toLocaleString() + ' Crypto';
    if (el('wstatTokens')) el('wstatTokens').textContent = worldStats.tokensCreated;
}

function selectAgent(id) {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;
    document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('selected'));
    const cards = document.querySelectorAll('.agent-card');
    if (cards[id]) cards[id].classList.add('selected');
}

// ========== WORLD CANVAS RENDERING ==========
function renderWorld() {
    const canvas = document.getElementById('agenticWorldCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 500;
    const w = canvas.width;
    const h = canvas.height;

    const hour = (worldTime % 1440) / 60;
    const daylight = Math.max(0, Math.sin((hour - 6) / 12 * Math.PI));
    const bgR = Math.floor(140 + daylight * 20);
    const bgG = Math.floor(190 + daylight * 15);
    const bgB = Math.floor(120 + daylight * 15);
    ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    ctx.fillRect(0, 0, w, h);

    const cellW = w / GOL_COLS;
    const cellH = h / GOL_ROWS;
    for (let y = 0; y < GOL_ROWS; y++) {
        for (let x = 0; x < GOL_COLS; x++) {
            if (golGrid[y][x]) {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.06 + daylight * 0.03})`;
                ctx.fillRect(x * cellW + 1, y * cellH + 1, cellW - 2, cellH - 2);
            }
        }
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i < LOCATIONS.length; i++) {
        for (let j = i+1; j < LOCATIONS.length; j++) {
            const a = LOCATIONS[i], b = LOCATIONS[j];
            const dist = Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
            if (dist < 0.45) {
                ctx.beginPath();
                ctx.setLineDash([4, 6]);
                ctx.moveTo(a.x * w, a.y * h);
                ctx.lineTo(b.x * w, b.y * h);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }

    LOCATIONS.forEach(loc => {
        const lx = loc.x * w, ly = loc.y * h;
        const grd = ctx.createRadialGradient(lx, ly, 0, lx, ly, 35);
        grd.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(lx-45, ly-45, 90, 90);
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText(loc.emoji, lx, ly + 10);
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText(loc.name, lx, ly + 30);
    });

    agents.forEach(a => {
        if (!a.alive) return;
        a.friends.forEach(fid => {
            const f = agents.find(ag => ag.id === fid && ag.alive);
            if (f) {
                ctx.beginPath();
                ctx.moveTo(a.x * w, a.y * h);
                ctx.lineTo(f.x * w, f.y * h);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });

    agents.forEach(a => {
        const ax = a.x * w;
        const ay = a.y * h;
        const alpha = a.alive ? 1 : a.deathFade;
        if (alpha <= 0.02) return;

        ctx.globalAlpha = alpha;

        if (a.alive) {
            const heartPulse = Math.sin(a.heartbeatFlash * 0.2) * 0.5 + 0.5;
            const glowColors = {
                working: `rgba(245, 158, 11, ${0.15 + heartPulse * 0.1})`,
                learning: `rgba(0, 240, 255, ${0.15 + heartPulse * 0.1})`,
                socializing: `rgba(236, 72, 153, ${0.15 + heartPulse * 0.1})`,
                resting: `rgba(6, 214, 160, ${0.1 + heartPulse * 0.05})`,
                idle: `rgba(168, 85, 247, ${0.08 + heartPulse * 0.05})`,
                traveling: `rgba(100,100,120, ${0.1 + heartPulse * 0.06})`,
                posting: `rgba(29, 161, 242, ${0.15 + heartPulse * 0.1})`,
                creating: `rgba(255, 0, 0, ${0.15 + heartPulse * 0.1})`,
                defi: `rgba(0, 255, 136, ${0.15 + heartPulse * 0.1})`,
                studying: `rgba(0, 240, 255, ${0.12 + heartPulse * 0.1})`,
                betting: `rgba(255, 215, 0, ${0.12 + heartPulse * 0.1})`
            };
            const glow = ctx.createRadialGradient(ax, ay, 0, ax, ay, 22 + heartPulse * 6);
            glow.addColorStop(0, glowColors[a.state] || 'rgba(168, 85, 247, 0.1)');
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(ax, ay, 28, 0, Math.PI * 2);
            ctx.fill();

            if (a.money < 20) {
                ctx.beginPath();
                ctx.arc(ax, ay, 18, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 + heartPulse * 0.4})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.beginPath();
        ctx.arc(ax, ay, a.alive ? 10 : 6, 0, Math.PI * 2);
        ctx.fillStyle = a.alive ? a.color : '#888';
        ctx.fill();
        if (a.alive) {
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.font = a.alive ? '20px serif' : '16px serif';
        ctx.textAlign = 'center';
        ctx.fillText(a.alive ? a.emoji : '💀', ax, ay - 15);

        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = a.alive ? 'rgba(255,255,255,0.85)' : 'rgba(200,50,50,0.5)';
        ctx.fillText(a.name, ax, ay + 22);
        if (a.alive) {
            ctx.font = '8px JetBrains Mono, monospace';
            ctx.fillStyle = a.money < 20 ? 'rgba(255,80,80,0.9)' : 'rgba(255,255,200,0.75)';
            ctx.fillText(a.money.toFixed(0) + ' Crypto', ax, ay + 32);
        }

        if (a.bubbleTimer > 0) {
            ctx.font = '16px serif';
            ctx.globalAlpha = alpha * (a.bubbleTimer / 50);
            ctx.fillText(a.bubbleText, ax + 18, ay - 22);
        }

        ctx.globalAlpha = 1;
    });

    const alive = agents.filter(a => a.alive).length;
    const dead = agents.filter(a => !a.alive).length;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const timeIcon = hour >= 6 && hour < 18 ? '☀️' : '🌙';
    ctx.fillText(`${timeIcon} ${hour >= 6 && hour < 18 ? 'Day' : 'Night'}  |  Alive: ${alive}  |  Dead: ${dead}  |  Gen of Life: active`, 10, 18);

    const hbPulse = Math.sin(worldTime * 0.1) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + hbPulse * 0.4})`;
    ctx.beginPath();
    ctx.arc(w - 20, 15, 4 + hbPulse * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'right';
    ctx.fillText('♥ heartbeat', w - 30, 18);
}

// ========== WORLD LOOP ==========
let lastUIUpdate = 0;
let golStepTimer = 0;
function worldLoop() {
    if (!worldRunning || worldPaused) return;

    worldTime += worldSpeed;

    golStepTimer++;
    if (golStepTimer >= Math.floor(120 / worldSpeed)) {
        stepGameOfLife();
        golStepTimer = 0;
    }

    const aliveCount = agents.filter(a => a.alive).length;
    if (aliveCount < 4 && Math.random() < 0.008 * worldSpeed) {
        spawnAgent();
    }

    agents.forEach(a => a.update());
    renderWorld();

    lastUIUpdate++;
    if (lastUIUpdate >= 25) {
        lastUIUpdate = 0;
        renderAgentList();
        renderLeaderboard();
        updateWorldUI();
    }

    worldAnimFrame = requestAnimationFrame(worldLoop);
}

function spawnAgent(parent) {
    const id = agents.length;
    const agent = new Agent(id, parent || null);
    agents.push(agent);
    worldStats.births++;
    if (!parent) {
        addActivity('think', agent, `${agent.name} spawned as ${agent.role}! 🔗 ${agent.wallet} | ${agent.money.toFixed(0)} Crypto`, '🌟');
    }
    renderAgentList();
    updateWorldUI();
    return agent;
}

function startAgenticWorld() {
    if (worldRunning) return;
    worldRunning = true;
    worldPaused = false;
    document.getElementById('worldOverlay').classList.add('hidden');
    document.getElementById('btnStartWorld').style.display = 'none';
    document.getElementById('btnPauseWorld').style.display = 'inline-flex';

    for (let i = 0; i < 6; i++) spawnAgent();
    worldLoop();
}

function pauseAgenticWorld() {
    worldPaused = !worldPaused;
    document.getElementById('btnPauseWorld').querySelector('span').textContent = worldPaused ? 'Resume' : 'Pause';
    if (!worldPaused) worldLoop();
}

function speedUpWorld() {
    worldSpeed = worldSpeed >= 8 ? 1 : worldSpeed * 2;
    const btn = document.querySelector('.world-controls .btn-secondary:last-of-type span');
    if (btn) btn.textContent = `Speed ${worldSpeed}x`;
}
