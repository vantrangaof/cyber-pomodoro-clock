// --- State & Defaults ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const defaultState = {
  durations: { focus: 25, short: 5, long: 15 },
  cycles: 4,
  autoStartBreaks: true,
  autoStartFocus: false,
  tickSound: false,
  mode: "focus", // focus | short | long
  remaining: 25 * 60,
  sessionsDone: 0, // completed focus sessions today
  totalFocusSeconds: 0,
  lastDate: new Date().toDateString(),
  running: false,
  goal: ''
};

const goalInput   = document.getElementById('goalInput');
const saveGoalBtn = document.getElementById('saveGoal');
const goalDisplay = document.getElementById('goalDisplay');
const goalText    = document.getElementById('goalText');
const editGoalBtn = document.getElementById('editGoal');
const clearGoalBtn= document.getElementById('clearGoal');

// Break tools
const suggestExerciseBtn  = document.getElementById('suggestExercise');
const exerciseOut = document.getElementById('exerciseSuggestion');
const memeBtn     = document.getElementById('makeMeme');
const memeImg     = document.getElementById('memeImg');
const memeCaption = document.getElementById('memeCaption');

// Assistant
const tabsBar = document.querySelector('.assistant-tabs');
const panes   = document.querySelectorAll('.assistant-pane');
const sumIn   = document.getElementById('summarizeInput');
const sumBtn  = document.getElementById('summarizeBtn');
const sumOut  = document.getElementById('summarizeOut');
const brTopic = document.getElementById('brainstormTopic');
const brBtn   = document.getElementById('brainstormBtn');
const brOut   = document.getElementById('brainstormOut');
const chatLog = document.getElementById('chatLog');
const chatIn  = document.getElementById('chatInput');
const chatSend= document.getElementById('chatSend');


// GIFS
const GIFS = {
  focus: [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDRjZHNkaWd3Zzc2cWlnb3puNGtwYzRjMWRxdHU0YThzaGZyN3FpZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/93ijBF8mmpxdRYsIDz/giphy.gif", 
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1xNW1nZ2Q5MTN0eGtsdmQ3a2x6aG16ZjgxMjgwdDNjMGt2OXBqayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jQQRWxSlW1tWvWigA9/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZxOGhna3dvdmY0NTFrZHB6ZTFxcnRzZ2VlMXRhZ3hiYXVzN3pvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif"
  ],
  short: [
    "https://media.giphy.com/media/3o751Syb8nQNtUPD7G/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazl3enU2dzFhYnFxY3NudGJzd2F4ZmxyZzQ5dnFvc2U3MG94emEycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C29XSbnbUUUM4w9Nq9/giphy.gif", 
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazl3enU2dzFhYnFxY3NudGJzd2F4ZmxyZzQ5dnFvc2U3MG94emEycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C29XSbnbUUUM4w9Nq9/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG56eDMwYTBtZWM3eHEwaDhibTl0ZHA2d2FudG9wdnZoM3Bsa3lmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x5HlLDaLMZNVS/giphy.gif"
  ],
  long: [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTIybTU4bWNrazJneXg5YzlkOXF1dHJ0MmxjYTc3ZG9ibDE4cGV2byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZV0rz1ARUleBq/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3MyMDN3NzVsbHo2aGIxaHZrMjF2Ynl3eWkzbWpoenhyeGVhM3NkdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J4FsxFgZgN2HS/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW00aG53NWJyNmZ1Y2twdmZjbnhzZDUwZ3BlYTNha2cyMHd2azZvZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lo6BKNnNjKFy4A0Gc8/giphy.gif",
  ],
};

const EXERCISES = [
  "👀 20-20-20: Look 20 ft away for 20s",
  "🧍 Neck rolls 5x each side",
  "🤸 Shoulder shrugs 10x",
  "🧘 Box breathing 4×4×4×4",
  "🚶 1-minute walk & hydrate",
  "🙆 Wrist circles 10x"
];

const MEME_IMAGES = [
  // add your own or keep a few fun placeholders
  "https://i.imgur.com/YOQ2y0D.jpeg",
  "https://i.imgur.com/fJ4F6qE.jpeg",
  "https://i.imgur.com/0fW8VQm.jpeg"
];
const MEME_TEMPLATES = [
  (goal) => `Me before focus: “I’ll just check my phone once.”\nMe after: 2 hours later…`,
  (goal) => `When the plan is ${goal || '“get stuff done”'} but the brain says snack time.`,
  () => `Short break: 5 minutes\nMe: *starts a new TV series*`,
];

suggestExerciseBtn?.addEventListener('click', () => {
  const pick = EXERCISES[Math.floor(Math.random()*EXERCISES.length)];
  exerciseOut.style.display = "block"
  exerciseOut.textContent = pick;
});


function onEnterBreak(){
  if (exerciseOut) exerciseOut.textContent =
      EXERCISES[Math.floor(Math.random()*EXERCISES.length)];
  memeBtn?.click();
}

// MUSIC
// const tickAudio = new Audio('assets/tick.mp3');
// const chimeAudio = new Audio('assets/chime.mp3');
// tickAudio.loop = true;
// tickAudio.volume = 0.2; // softer ticking
// chimeAudio.volume = 0.5; // chime volume

const focusMusic = new Audio("assets/nothing-bruno-major.mp3");
focusMusic.loop = true;
focusMusic.volume = 0.3;

// When Start button is clicked
// document.getElementById("startPause").addEventListener("click", () => {
//   focusMusic.play().catch(err => {
//     console.error("Music playback blocked:", err);
//   });
// });

// const audio = new Audio("assets/nothing-bruno-major.mp3");

// audio.play().then(() => {
//     console.log("Music is playing!");
// }).catch((err) => {
//     console.error("Music playback blocked:", err);
// });

let state = loadState();
let timerId = null;
let tickOsc = null; // WebAudio oscillator for ticking

function loadState() {
  try {
    const raw = localStorage.getItem("cute-pomodoro-v1");
    if (!raw) return { ...defaultState };
    const s = JSON.parse(raw);
    // reset daily counters if day changed
    const today = new Date().toDateString();
    if (s.lastDate !== today) {
      s.sessionsDone = 0;
      s.totalFocusSeconds = 0;
      s.lastDate = today;
    }
    return {
      ...defaultState,
      ...s,
      durations: { ...defaultState.durations, ...(s.durations || {}) },
    };
  } catch (e) {
    return { ...defaultState };
  }
}
function saveState() {
  localStorage.setItem("cute-pomodoro-v1", JSON.stringify(state));
}

// --- UI Bindings ---
const progress = $("#progress");
const timeEl = $("#time");
const subtitle = $("#subtitle");
const startPause = $("#startPause");
const skipBtn = $("#skip");
const phaseBadge = $("#phaseBadge");

const inputs = {
  focus: $("#focusMins"),
  short: $("#shortMins"),
  long: $("#longMins"),
  cycles: $("#cycles"),
  autoStartBreaks: $("#autoStartBreaks"),
  autoStartFocus: $("#autoStartFocus"),
  tickSound: $("#tickSound"),
};

// init inputs
inputs.focus.value = state.durations.focus;
inputs.short.value = state.durations.short;
inputs.long.value = state.durations.long;
inputs.cycles.value = state.cycles;
inputs.autoStartBreaks.checked = state.autoStartBreaks;
inputs.autoStartFocus.checked = state.autoStartFocus;
inputs.tickSound.checked = state.tickSound;

// stats
const doneCount = $("#doneCount");
const totalMinutes = $("#totalMinutes");

// Tabs
$$(".tab").forEach((tab) =>
  tab.addEventListener("click", () => switchMode(tab.dataset.mode, true))
);

// Buttons
startPause.addEventListener("click", toggleStartPause);
skipBtn.addEventListener("click", () => completePhase(true));
$("#resetAllBtn").addEventListener("click", hardReset);
$("#notifBtn").addEventListener("click", requestNotification);
$("#soundBtn").addEventListener("click", chime);

// Inputs change
inputs.focus.addEventListener("change", () =>
  updateDuration("focus", clamp(+inputs.focus.value, 1, 180))
);
inputs.short.addEventListener("change", () =>
  updateDuration("short", clamp(+inputs.short.value, 1, 60))
);
inputs.long.addEventListener("change", () =>
  updateDuration("long", clamp(+inputs.long.value, 1, 90))
);
inputs.cycles.addEventListener("change", () => {
  state.cycles = clamp(+inputs.cycles.value, 1, 12);
  inputs.cycles.value = state.cycles;
  saveState();
});
inputs.autoStartBreaks.addEventListener("change", () => {
  state.autoStartBreaks = inputs.autoStartBreaks.checked;
  saveState();
});
inputs.autoStartFocus.addEventListener("change", () => {
  state.autoStartFocus = inputs.autoStartFocus.checked;
  saveState();
});
inputs.tickSound.addEventListener("change", () => {
  state.tickSound = inputs.tickSound.checked;
  if (!state.tickSound) stopTick();
  saveState();
});

// Hotkeys
// window.addEventListener("keydown", (e) => {
//   if (e.code === "Space") {
//     e.preventDefault();
//     toggleStartPause();
//   }
//   if (e.key.toLowerCase() === "n") {
//     e.preventDefault();
//     completePhase(true);
//   }
//   if (e.key.toLowerCase() === "r") {
//     e.preventDefault();
//     resetTimer();
//   }
// });

window.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || document.activeElement.isContentEditable) {
    return; // don't trigger while typing
  }

  if (e.code === "Space") {
    e.preventDefault();
    toggleStartPause();
  }
  if (e.key.toLowerCase() === "n") {
    e.preventDefault();
    completePhase(true);
  }
  if (e.key.toLowerCase() === "r") {
    e.preventDefault();
    resetTimer();
  }
});


// Notification Permission on first load (non-blocking)
if (Notification && Notification.permission === "default") {
  // ask later via button; don't auto prompt to be polite
}

// --- Functions ---
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function updateDuration(mode, mins) {
  state.durations[mode] = mins;
  if (state.mode === mode && !state.running) {
    state.remaining = mins * 60;
  }
  saveState();
  render();
}

function switchMode(mode, fromTab = false) {
  if (state.mode === mode && fromTab) return; // ignore clicking current
  state.mode = mode;
  state.remaining = state.durations[mode] * 60;
  state.running = false;
  stopTick();
  saveState();

  setRandomGif(mode); // ✅ change GIF only once per mode change

  render();
}

function toggleStartPause() {
  state.running = !state.running;
   if (state.mode === "focus" && state.running) {
    speakStart(state.durations.focus, state.goal);
    focusMusic.play()
      .then(() => console.log("Music playing"))
      .catch(err => console.error("Play failed:", err));
  }
  if (state.running) startTimer();
  else {
    focusMusic.pause(); // optional: pause on stop
    stopTimer();
  }
  render();
}

function speakStart(mins, goal){
  try {
    const msg = new SpeechSynthesisUtterance(
      `Starting a deep focus session for ${mins} minutes.${goal ? ' Goal: ' + goal : ''}`
    );
    msg.lang = 'en-US'; msg.rate = 1.03; msg.pitch = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  } catch(e) { /* ok */ }
}

function startTimer() {
  const startedAt = Date.now();
  let last = startedAt;
  stopTimer();
  timerId = setInterval(() => {
    const now = Date.now();
    const dt = Math.round((now - last) / 1000);
    if (dt > 0) {
      state.remaining -= dt;
      if (state.mode === "focus") state.totalFocusSeconds += dt;
      last = now;
      if (state.remaining <= 0) {
        completePhase();
      }
      if (state.tickSound) tick();
      render();
    }
  }, 250);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  focusMusic.pause();
  focusMusic.currentTime = 0;
  stopTick();
}

function resetTimer() {
  state.remaining = state.durations[state.mode] * 60;
  state.running = false;
  stopTimer();
  render();
  saveState();
}

function completePhase(skipped = false) {
  stopTimer();
  if (!skipped) chime();
  showNotification(
    `${capitalize(state.mode)} ${skipped ? "skipped" : "done"}!`,
    nextPhaseMessage()
  );
  if (state.mode === "focus" && !skipped) {
    state.sessionsDone++;
  }
  // Next mode logic
  if (state.mode === "focus") {
    const isLong = state.sessionsDone % state.cycles === 0;
    state.mode = isLong ? "long" : "short";
    state.remaining = state.durations[state.mode] * 60;
    state.running = (isLong || !isLong) && state.autoStartBreaks;
  } else {
    // from break -> focus
    state.mode = "focus";
    state.remaining = state.durations.focus * 60;
    state.running = state.autoStartFocus;
  }

  setRandomGif(state.mode); // ✅ update when moving to next mode

  saveState();
  if (state.running) startTimer();
  render();
}

function nextPhaseMessage() {
  if (state.mode === "focus") return "Time for a break! 🌿";
  return "Back to focus—let's go! 💪";
}

function setRandomGif(mode) {
  const gifEl = document.getElementById("modeGif");
  if (!gifEl) return;
  const pool = GIFS[mode] || GIFS.focus;
  const randomGif = pool[Math.floor(Math.random() * pool.length)];
  gifEl.src = randomGif;
}

function render() {
  // tabs
  $$(".tab").forEach((t) => {
    const active = t.dataset.mode === state.mode;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
    t.tabIndex = active ? 0 : -1;
  });

  // badge & subtitle
  phaseBadge.textContent = labelForMode(state.mode);
  subtitle.textContent = subtitleForMode(state.mode, state.running);

  // time string
  const m = Math.max(0, Math.floor(state.remaining / 60));
  const s = Math.max(0, state.remaining % 60);
  timeEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )}`;

  // progress ring
  // const total = state.durations[state.mode] * 60;
  // const frac = 1 - (state.remaining / total);
  // const circumference = 2 * Math.PI * 45;
  // const dash = Math.max(0, Math.min(circumference, circumference * frac));
  // progress.setAttribute('stroke-dasharray', `${dash} ${circumference}`);

  // start/pause button label
  startPause.textContent = state.running ? "⏸️ Pause" : "▶️ Start";

  // stats
  doneCount.textContent = state.sessionsDone;
  totalMinutes.textContent = `${Math.floor(state.totalFocusSeconds / 60)} min`;


  document.title = `${timeEl.textContent} • ${labelForMode(state.mode)} 🍅`;

  subtitle.textContent = subtitleForMode(state.mode, state.running);
  goalDisplay?.classList.toggle('active', state.mode === 'focus');

  document.addEventListener("DOMContentLoaded", () => {
  if (state.mode === 'short' || state.mode === 'long') {
    breakTools.classList.remove('hidden');
    goalWrap.classList.add('hidden');
    onEnterBreak(); // optional: auto suggest exercise + meme
  }
});
}

function labelForMode(m) {
  return m === "focus" ? "Focus" : m === "short" ? "Short Break" : "Long Break";
}
function subtitleForMode(m, running) {
  if (m === "focus")
    return running ? "Deep focus mode. 🚀" : "Let’s focus. You’ve got this! ✨";
  if (m === "short") return "Breathe. Hydrate. Stretch. 🧘🏻‍♀️🌿";
  return "Take a longer pause. You earned it. 🌴🥥";
}

// --- Sound & Notifications ---
function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t0 = ctx.currentTime;
    // cute triad blip
    [
      [880, 0],
      [660, 0.08],
      [523.25, 0.16],
    ].forEach(([freq, delay]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, t0 + delay);
      g.gain.linearRampToValueAtTime(0.15, t0 + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + 0.35);
      o.connect(g).connect(ctx.destination);
      o.start(t0 + delay);
      o.stop(t0 + delay + 0.4);
    });
  } catch (e) {
    console.debug("Chime failed", e);
  }
}

function tick() {
  try {
    if (!tickOsc) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 2; // 2Hz click-like
      g.gain.value = 0.02; // subtle
      o.connect(g).connect(ctx.destination);
      o.start();
      tickOsc = { ctx, o, g };
    }
  } catch (e) {
    /* ignore */
  }
}
function stopTick() {
  if (tickOsc) {
    try {
      tickOsc.o.stop();
      tickOsc.ctx.close();
    } catch (e) {}
    tickOsc = null;
  }
}

async function requestNotification() {
  try {
    if (!("Notification" in window))
      return alert("Notifications are not supported in this browser.");
    const perm = await Notification.requestPermission();
    if (perm !== "granted")
      alert(
        "Notifications not enabled. You can enable them in your browser settings later."
      );
    else
      new Notification("Notifications enabled ✅", {
        body: "I'll ping you when a phase ends.",
      });
  } catch (e) {
    console.debug(e);
  }
}
function showNotification(title, body) {
  try {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted")
      new Notification(title, { body });
  } catch (e) {
    /* ignore */
  }
}

function hardReset() {
  if (!confirm("Reset settings and stats?")) return;
  localStorage.removeItem("cute-pomodoro-v1");
  state = {
    ...defaultState,
    remaining: defaultState.durations.focus * 60,
    lastDate: new Date().toDateString(),
  };
  stopTimer();
  Object.assign(inputs, {
    focus: $("#focusMins"),
    short: $("#shortMins"),
    long: $("#longMins"),
    cycles: $("#cycles"),
  });
  inputs.focus.value = state.durations.focus;
  inputs.short.value = state.durations.short;
  inputs.long.value = state.durations.long;
  inputs.cycles.value = state.cycles;
  inputs.autoStartBreaks.checked = state.autoStartBreaks;
  inputs.autoStartFocus.checked = state.autoStartFocus;
  inputs.tickSound.checked = state.tickSound;
  saveState();
  render();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// initial render
// Ensure remaining is consistent with mode
if (!state.remaining || isNaN(state.remaining))
  state.remaining = state.durations[state.mode] * 60;
render();

// document.addEventListener("click", () => {
//   focusMusic.muted = false;
//   focusMusic.play().then(() => {
//     focusMusic.pause();
//     focusMusic.currentTime = 0;
//   }).catch(() => {
//     console.warn("Autoplay blocked. User must start playback manually.");
//   });
// }, { once: true });

// init goal
goalInput.value = state.goal || "";
syncGoalUI();

saveGoalBtn?.addEventListener('click', () => {
  state.goal = goalInput.value.trim();
  saveState(); syncGoalUI();
});

editGoalBtn?.addEventListener('click', () => {
  goalInput.value = state.goal;
  goalDisplay.hidden = true;
  document.querySelector('.goal-editor').style.display = 'flex';
  goalInput.focus();
});

clearGoalBtn?.addEventListener('click', () => {
  state.goal = "";
  saveState(); syncGoalUI();
});

function syncGoalUI(){
  const has = !!state.goal;
  goalText.textContent = state.goal;
  goalDisplay.hidden = !has;
  const editor = document.querySelector('.goal-editor');
  if (editor) editor.style.display = has ? 'none' : 'flex';
}



const tabs = document.querySelectorAll('nav .tab');
const breakTools = document.getElementById('breakTools');
const goalWrap = document.getElementById('goal-wrap');


tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.mode;

    // Show/hide Break Tools
    if (mode === 'short' || mode === 'long') {
      breakTools.classList.remove('hidden');
      goalWrap.classList.add('hidden')
    } else {
      breakTools.classList.add('hidden');
      goalWrap.classList.remove('hidden')
    }
  });
});


async function fetchMeme() {
  try {
    const response = await fetch("https://meme-api.com/gimme");
    const data = await response.json();

    // This API gives you already-captioned memes
    document.querySelector("#meme-img").src = data.url;  // meme image
    // document.querySelector("#meme-title").innerText = data.title; // caption/title
  } catch (error) {
    console.error("Error fetching meme:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchMeme);
document.getElementById("generateMemeBtn").addEventListener("click", fetchMeme);

const playBtn = document.getElementById('playMusic');
const popup = document.getElementById('musicPopup');
const closeBtn = document.getElementById('closeMusic');
const minimizeBtn = document.getElementById('minimizeMusic');
const iframe = document.getElementById('scPlayer');

playBtn.addEventListener('click', () => {
  playBtn.textContent = "⏸ Pause music";
  popup.style.display = 'flex';
  popup.classList.remove('minimized'); // Always restore full size when opened

  iframe.src = iframe.src.replace('auto_play=false', 'auto_play=true');
});

closeBtn.addEventListener('click', () => {
  playBtn.textContent = "🎶 Play music";
  popup.style.display = 'none';

  iframe.src = iframe.src.replace('auto_play=true', 'auto_play=false');
});

minimizeBtn.addEventListener('click', () => {
  popup.classList.toggle('minimized');
});
