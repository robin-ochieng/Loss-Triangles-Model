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
            element: '#dynamic-clock',
            intro: 'Here you can see the current time, updated in real time.'
          },
          // ----------------------------------------------------
          // NEW STEPS FOR THE SECOND TAB (Data Insights):
          // ----------------------------------------------------
          {
            element: document.querySelector('#data_insights_tab_trigger'),
            intro: 'Navigate to the Claims Dashboard to see detailed analytics.',
            onbeforechange: function() {
              document.querySelector('a[data-value="data_insights"]').click();
            }
          },
          {
            element: '#total_gross_paid_box',
            intro: 'This value box shows the total gross paid so far.'
          },
          {
            element: 'avg_days_to_pay_box',
            intro: 'This displays the average days it takes to pay a claim.'
          },
          {
            element: '#data_insights_id-total_claims_box',
            intro: 'This value box indicates the total number of claims.'
          },
          {
            element: '#data_insights_id-claim_count_plot',
            intro: 'Here is a lollipop chart showing the distribution of claims by Statutory Class.'
          },
          {
            element: '#data_insights_id-gross_paid_plot',
            intro: 'Next, a bar plot for sum of gross paid by Statutory Class.'
          },
          {
            element: '#data_insights_id-grossPaidbyPaidDate',
            intro: 'Distribution of Gross Paid by Paid Date shown in this line chart.'
          },
          {
            element: '#data_insights_id-claimsbyLossDate',
            intro: 'Distribution of Claims by Loss Date shown in this line chart.'
          },
          {
            element: '#data_insights_id-claimsbyPaidDate',
            intro: 'Distribution of Claims by Paid Date shown in this line chart.'
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
  

  
  