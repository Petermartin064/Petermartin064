// Save this as github-activity-panel.js
// This creates a futuristic interactive dashboard for your GitHub activity

document.addEventListener('DOMContentLoaded', function() {
    // Create container for the dashboard if it doesn't exist
    if (!document.getElementById('github-activity-dashboard')) {
      createDashboard();
      populateDashboard();
      addInteractivity();
    }
  });
  
  function createDashboard() {
    // Create main container
    const dashboard = document.createElement('div');
    dashboard.id = 'github-activity-dashboard';
    dashboard.className = 'activity-dashboard';
    
    // Set dashboard styles
    dashboard.style.cssText = `
      width: 100%;
      background-color: #0d1117;
      border-radius: 10px;
      padding: 20px;
      margin: 30px 0;
      font-family: 'Courier New', monospace;
      color: #00ff00;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
      position: relative;
      overflow: hidden;
      border: 1px solid #00ff00;
    `;
    
    // Add dashboard title
    const title = document.createElement('div');
    title.className = 'dashboard-title';
    title.innerHTML = `<h2>GITHUB ACTIVITY CONTROL PANEL</h2>`;
    title.style.cssText = `
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #00ff00;
    `;
    
    // Add the grid layout for the dashboard
    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, auto);
      gap: 15px;
    `;
    
    // Add sections to the grid
    const sections = [
      {id: 'activity-monitor', title: 'ACTIVITY MONITOR'},
      {id: 'commit-log', title: 'RECENT COMMITS'},
      {id: 'skill-radar', title: 'SKILL RADAR'},
      {id: 'project-status', title: 'PROJECT STATUS'},
      {id: 'connection-status', title: 'CONNECTION STATUS'},
      {id: 'terminal', title: 'TERMINAL ACCESS'}
    ];
    
    sections.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.id = section.id;
      sectionEl.className = 'dashboard-section';
      sectionEl.style.cssText = `
        background-color: rgba(0, 30, 0, 0.5);
        border: 1px solid #00aa00;
        border-radius: 5px;
        padding: 15px;
        position: relative;
      `;
      
      const header = document.createElement('div');
      header.className = 'section-header';
      header.innerHTML = `
        <div class="section-title">${section.title}</div>
        <div class="section-controls">
          <span class="control-dot" style="background-color: #ff5f56;"></span>
          <span class="control-dot" style="background-color: #ffbd2e;"></span>
          <span class="control-dot" style="background-color: #27c93f;"></span>
        </div>
      `;
      header.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #00aa00;
        font-size: 14px;
        font-weight: bold;
      `;
      
      const content = document.createElement('div');
      content.className = 'section-content';
      content.id = `${section.id}-content`;
      content.style.cssText = `
        height: 150px;
        overflow: auto;
        font-size: 12px;
      `;
      
      // Style for the control dots
      const dots = header.querySelectorAll('.control-dot');
      dots.forEach(dot => {
        dot.style.cssText = `
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-left: 5px;
        `;
      });
      
      sectionEl.appendChild(header);
      sectionEl.appendChild(content);
      grid.appendChild(sectionEl);
    });
    
    // Add decorative elements - blinking cursor
    const cursor = document.createElement('div');
    cursor.className = 'blinking-cursor';
    cursor.innerHTML = '_';
    cursor.style.cssText = `
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 20px;
      animation: blink 1s infinite;
    `;
    
    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      @keyframes scan {
        0% { top: 0; }
        100% { top: 100%; }
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
        50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
        100% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
      }
      
      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: rgba(0, 255, 0, 0.5);
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        animation: scan 3s linear infinite;
        z-index: 1;
      }
      
      .activity-dashboard:hover {
        animation: pulse 2s infinite;
      }
      
      .dashboard-section:hover {
        border-color: #00ff00;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        transition: all 0.3s ease;
      }
      
      .terminal-text {
        color: #00ff00;
        margin: 0;
        padding: 0;
        line-height: 1.5;
      }
      
      #skill-radar-content canvas {
        width: 100%;
        height: 100%;
      }
    `;
    
    // Add scan line effect
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    
    // Assemble the dashboard
    dashboard.appendChild(title);
    dashboard.appendChild(grid);
    dashboard.appendChild(cursor);
    dashboard.appendChild(scanLine);
    document.body.appendChild(dashboard);
    document.head.appendChild(style);
  }
  
  function populateDashboard() {
    // Activity Monitor
    const activityMonitor = document.getElementById('activity-monitor-content');
    activityMonitor.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <p class="terminal-text">Commits today: <span id="commits-today">7</span></p>
          <p class="terminal-text">Current streak: <span id="current-streak">12 days</span></p>
          <p class="terminal-text">Last active: <span id="last-active">1 hour ago</span></p>
        </div>
        <div style="background-color: rgba(0, 50, 0, 0.3); border-radius: 3px; padding: 5px;">
          <div id="activity-bar" style="height: 20px; width: 75%; background-color: #00ff00; border-radius: 2px; position: relative;">
            <span style="position: absolute; right: 5px; color: #001400; font-weight: bold; font-size: 10px;">75%</span>
          </div>
          <p class="terminal-text" style="margin-top: 5px; font-size: 10px;">Activity level: HIGH</p>
        </div>
      </div>
    `;
    
    // Recent Commits
    const commitLog = document.getElementById('commit-log-content');
    commitLog.innerHTML = `
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li class="terminal-text">[<span style="color: #ffbd2e;">Today 14:23</span>] Implemented new feature</li>
        <li class="terminal-text">[<span style="color: #ffbd2e;">Today 11:05</span>] Fixed responsive layout</li>
        <li class="terminal-text">[<span style="color: #ffbd2e;">Yesterday 18:47</span>] Updated documentation</li>
        <li class="terminal-text">[<span style="color: #ffbd2e;">Yesterday 16:32</span>] Initial commit</li>
      </ul>
    `;
    
    // Skill Radar - We'll use a canvas for this
    const skillRadar = document.getElementById('skill-radar-content');
    skillRadar.innerHTML = `<canvas id="radar-chart"></canvas>`;
    
    // Project Status
    const projectStatus = document.getElementById('project-status-content');
    projectStatus.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <tr>
          <th style="text-align: left; padding: 3px; border-bottom: 1px solid #00aa00;">Project</th>
          <th style="text-align: left; padding: 3px; border-bottom: 1px solid #00aa00;">Status</th>
          <th style="text-align: left; padding: 3px; border-bottom: 1px solid #00aa00;">Progress</th>
        </tr>
        <tr>
          <td style="padding: 3px;">Project 1</td>
          <td style="padding: 3px;"><span style="color: #27c93f;">ACTIVE</span></td>
          <td style="padding: 3px;">75%</td>
        </tr>
        <tr>
          <td style="padding: 3px;">Project 2</td>
          <td style="padding: 3px;"><span style="color: #ffbd2e;">PENDING</span></td>
          <td style="padding: 3px;">30%</td>
        </tr>
        <tr>
          <td style="padding: 3px;">Project 3</td>
          <td style="padding: 3px;"><span style="color: #ff5f56;">CRITICAL</span></td>
          <td style="padding: 3px;">90%</td>
        </tr>
      </table>
    `;
    
    // Connection Status
    const connectionStatus = document.getElementById('connection-status-content');
    connectionStatus.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <p class="terminal-text">GitHub: <span style="color: #27c93f;">CONNECTED</span></p>
          <p class="terminal-text">LinkedIn: <span style="color: #27c93f;">CONNECTED</span></p>
          <p class="terminal-text">Twitter: <span style="color: #ffbd2e;">STANDBY</span></p>
          <p class="terminal-text">Portfolio: <span style="color: #27c93f;">CONNECTED</span></p>
        </div>
        <div>
          <p class="terminal-text" style="font-size: 10px;">ENCRYPTION: <span style="color: #27c93f;">ENABLED</span></p>
          <p class="terminal-text" style="font-size: 10px;">VPN STATUS: <span style="color: #27c93f;">ACTIVE</span></p>
        </div>
      </div>
    `;
    
    // Terminal
    const terminal = document.getElementById('terminal-content');
    terminal.innerHTML = `
      <div id="terminal-output" style="font-family: 'Courier New', monospace; color: #00ff00;">
        <p class="terminal-text">$ whoami</p>
        <p class="terminal-text">petermartin064</p>
        <p class="terminal-text">$ pwd</p>
        <p class="terminal-text">/home/petermartin064/projects</p>
        <p class="terminal-text">$ <span id="typing-command"></span></p>
      </div>
    `;
    
    // Draw radar chart for skills if Chart.js is available
    setTimeout(() => {
      if (typeof Chart !== 'undefined') {
        drawSkillRadar();
      } else {
        // Fallback if Chart.js is not available
        document.getElementById('skill-radar-content').innerHTML = `
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <p class="terminal-text">SKILLS</p>
            <ul style="list-style: none; padding: 0;">
              <li class="terminal-text">JavaScript [=========] 90%</li>
              <li class="terminal-text">Python [=======] 70%</li>
              <li class="terminal-text">React [========] 80%</li>
              <li class="terminal-text">Node.js [========] 80%</li>
              <li class="terminal-text">CSS [======] 60%</li>
            </ul>
          </div>
        `;
      }
    }, 500);
  }
  
  function drawSkillRadar() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'Git'],
        datasets: [{
          label: 'Skills',
          data: [90, 70, 80, 80, 60, 85],
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: '#00ff00',
          pointBackgroundColor: '#00ff00',
          pointBorderColor: '#00ff00',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00ff00'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 2
          }
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 20
          }
        }
      }
    });
  }
  
  function addInteractivity() {
    // Typing effect in terminal
    const commands = [
      'ls -la',
      'git status',
      'npm run build',
      'docker ps',
      'ssh server1'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeCommand() {
      const typingElement = document.getElementById('typing-command');
      if (!typingElement) return;
      
      const currentCommand = commands[commandIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentCommand.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typingSpeed = 500; // Pause before typing next command
      }
      
      setTimeout(typeCommand, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeCommand, 1000);
    
    // Make the activity bar "live"
    let direction = 1;
    let activityLevel = 75;
    
    function updateActivityBar() {
      const activityBar = document.getElementById('activity-bar');
      if (!activityBar) return;
      
      // Randomly change direction occasionally
      if (Math.random() < 0.1) {
        direction = -direction;
      }
      
      // Update activity level
      activityLevel += direction * Math.random() * 2;
      
      // Keep within bounds
      if (activityLevel > 95) {
        activityLevel = 95;
        direction = -1;
      } else if (activityLevel < 50) {
        activityLevel = 50;
        direction = 1;
      }
      
      // Update the display
      activityBar.style.width = `${activityLevel}%`;
      activityBar.innerHTML = `<span style="position: absolute; right: 5px; color: #001400; font-weight: bold; font-size: 10px;">${Math.round(activityLevel)}%</span>`;
      
      setTimeout(updateActivityBar, 2000);
    }
    
    // Start activity bar animation
    setTimeout(updateActivityBar, 2000);
    
    // Add click events to sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
      section.addEventListener('click', function() {
        // Highlight the clicked section
        sections.forEach(s => s.style.boxShadow = 'none');
        this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
        
        // Add a "selected" indicator
        const header = this.querySelector('.section-header');
        const indicator = document.createElement('span');
        indicator.className = 'section-selected';
        indicator.textContent = 'ACTIVE';
        indicator.style.cssText = `
          color: #00ff00;
          font-size: 10px;
          margin-left: 10px;
          animation: blink 1s infinite;
        `;
        
        // Remove any existing indicators
        document.querySelectorAll('.section-selected').forEach(el => el.remove());
        
        // Add the new indicator
        header.querySelector('.section-title').appendChild(indicator);
      });
    });
  }
  
  // This code creates an interactive dashboard that simulates a futuristic control panel
  // with live updates and animations. It needs to be hosted somewhere to work properly.
  // The best approach would be to create a GitHub Pages site for this.