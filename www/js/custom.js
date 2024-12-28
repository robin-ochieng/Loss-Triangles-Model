// Real-time clock script
function updateClock() {
    const clockElement = document.getElementById("dynamic-clock");
    if (clockElement) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      clockElement.textContent = timeString;
    }
  }
  
  // Update the clock every second
  setInterval(updateClock, 1000);



  // www/JS/script.js

document.addEventListener("DOMContentLoaded", function() {
  
    // 1. Grab the "Take a Tour" button from Shiny’s DOM
    const startTourBtn = document.getElementById("startTour");
    if (!startTourBtn) return; // if not found, no need to proceed
  
    // 2. Add a click event to launch the tour
    startTourBtn.addEventListener("click", function() {
      const tour = introJs();
  
      // 3. Define the steps for the tour
      //    Each step references an element (by ID) and a small description.
      tour.setOptions({
        steps: [
          {
            element: '#sidebar',
            intro: 'This is the sidebar. Use it to navigate among different sections of the dashboard.'
          },
          {
            element: '#dataUpload',
            intro: 'Click the "Browse" button to Upload your claims data as a CSV or Excel file.'
          },
          {
            element: '#dataOverview',
            intro: 'This is where the uploaded Claims Data is Output.'
          },
          {
            element: '#data_insights_id-grosspaid_tabs',
            intro: 'This tab box contains Visuals for Distribution of Statutory Class and Gross Paid by Statutory Class.'
          },
          {
            element: '#dynamic-clock',
            intro: 'Here you can see the current time, updated in real time.'
          },
          // Add more steps as needed...
        ],
        showProgress: true,        // shows a progress bar
        showBullets: false,        // hides the list of bullets
        exitOnOverlayClick: false, // ensures user can’t accidentally close by clicking outside
        nextLabel: 'Next',
        prevLabel: 'Back',
        skipLabel: 'Skip',
        doneLabel: 'Finish'
      });
  
      // 4. Start the tour
      tour.start();
    });
  });
  

  
  