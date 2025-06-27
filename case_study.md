# 🧠 Case Study: Battleships (3D Grid Strategy Game)

> A uniquely immersive, AI-powered battleship game built from scratch with **Three.js**, **GSAP**, and **modular vanilla JavaScript**. Designed with a strong focus on creativity, UX polish, and intelligent game logic.

---

## 🎮 Overview

**Battleships** is more than just a game — it’s a creative project that combines 3D visual aesthetics with clean game logic, a fully functional player-vs-player mode, and a challenging AI opponent. It started as a vanilla JavaScript project but grew into a visual and technical showcase.

- 🔷 Built a **3D menu** using Three.js with interactive cube grid
- 📸 Used **GSAP** to animate camera movement into game mode
- 🧠 Designed a **custom AI** that mimics real human strategy (not random guessing)
- 🧩 Modular architecture for clarity and scalability
- 🔍 Every single **edge case** has been handled in both game modes

---

## ⚙️ Tech Stack

| Tool / Tech        | Purpose                                      |
|--------------------|----------------------------------------------|
| **HTML/CSS/JS**    | Base structure & logic                       |
| **Three.js**       | 3D grid menu + background cube animation     |
| **GSAP**           | Smooth camera transitions and animations     |
| **JavaScript Modules (ES6)** | Clean file separation for maintainability |
| **DOM Manipulation**| For dynamic grid creation & interaction     |

---

## ✨ Design Highlights

### 🎲 3D Interactive Menu
- The homepage features a dynamic grid of 3D cubes using **Three.js**, subtly animated using GSAP.
- Hovering effects give a sense of interactivity and depth.
- Clicking a menu option animates the camera to a new position, revealing the game grid seamlessly.

### 🚀 Transitions with Purpose
- All transitions feel natural and cinematic, improving UX and immersion.
- Reusable GSAP animations for camera, grid, and UI fades.

---

## 🧠 AI Breakdown: The "Smart Bot"

Unlike typical random shooters, the AI in single-player mode uses **stateful logic**:

### 1. **Hunt Mode**
- Randomly selects tiles until it hits a ship.

### 2. **Target Mode**
- Remembers the hit tile.
- Explores in four directions to "lock onto" ship orientation.

### 3. **Sink Mode**
- Continues attacking in a single direction until it sinks the ship.
- Backs up and tries the opposite direction if it reaches a boundary or miss.

### 4. **Cleanup Mode**
- Marks surrounding tiles as "cleared" to avoid redundant guesses.
- Resets internal state and restarts from Hunt Mode.

> This approach gives the AI a **realistic and challenging personality**, harder than most human players.

---

## 📐 Edge Case Handling

| Feature                 | Status ✅ |
|--------------------------|-----------|
| Ship overlap prevention | ✅ |
| Random ship rotation & placement | ✅ |
| Prevent double-clicks on same cell | ✅ |
| Prevent spamming during transitions | ✅ |
| Game reset & replay smoothness | ✅ |
| Accurate win detection | ✅ |
| 2-Player mode UI switching | ✅ |
| Clean separation between Player vs AI and Player vs Player | ✅ |

---

## 📁 Modular Structure

> Your codebase follows SOLID principles with thoughtful file separation.

| File | Responsibility |
|------|----------------|
| `game.js` | Controls core game logic and state |
| `dom.js` | Handles DOM element creation and board management |
| `ai.js` | Contains AI behavior and state machine |
| `threeMenu.js` | Initializes and controls 3D scene |
| `transition.js` | GSAP transitions for smooth gameplay shift |
| `style.css` | Game and menu styling |
| `index.html` | Entry point |
| `utils.js` | Reusable helper functions |

---

## 🌈 What I’m Proud Of

- ✅ Original game logic — every line of AI strategy was written from scratch
- ✅ Integration of front-end visuals and logic without using frameworks
- ✅ Eye for polish — smooth transitions, no rough edges, professional feel
- ✅ This was a stretch project that pushed my creative and logical boundaries

---

## 🧠 What I Learned

- Deep understanding of **Three.js fundamentals**
- Practical usage of **GSAP for animation**
- Managing game state across multiple modes
- Structuring large front-end projects for **scalability**
- Writing an AI with **real strategy and memory**
- Edge case thinking and polishing UX

---

## 🔗 Live Demo

👉 [Play the Battleships Game](https://44ry4n.github.io/battleships/)

---

## 🖼️ Screenshots (Add if you want)

- 📸 3D Menu
- 🎯 Player vs Player Mode
- 🤖 AI Bot in Action
- 🌌 Camera Transition Effect

---

> "This wasn't just a coding project — it was design, animation, strategy, and architecture coming together."  
> – Aaryan Singh
