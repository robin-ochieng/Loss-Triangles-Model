# Loss Triangles Dashboard

A Shiny application for **claims data** processing and **loss triangle** construction. This dashboard enables uploading and viewing of claims data, exploring insights, and generating both **incremental** and **cumulative** claim development triangles using the [ChainLadder](https://cran.r-project.org/web/packages/ChainLadder/index.html) package. Built with [**bs4Dash**](https://rinterface.github.io/bs4Dash/), [**tidyverse**](https://www.tidyverse.org/), and [**bslib**](https://rstudio.github.io/bslib/), it provides a clean UI and easy workflow for claims analysis.

---

## Table of Contents

1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [Project Structure](#project-structure)  
4. [Requirements](#requirements)  
5. [Installation](#installation)  
6. [Usage](#usage)  
7. [Data Preparation](#data-preparation)  
8. [Modules](#modules)  
   - [Data Overview Module](#data-overview-module)  
   - [Data Insights Module](#data-insights-module)  
   - [Incremental Triangles Module](#incremental-triangles-module)  
   - [Cumulative Triangles Module](#cumulative-triangles-module)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## Overview

This application streamlines **loss triangle** construction for insurance claims data:
- **Upload** and **validate** Excel/CSV files with claims information.
- **Preview** and **inspect** claims data.
- Construct **incremental** or **cumulative** development triangles according to customizable time scales (Yearly, Quarterly, Monthly).
- **Download** triangle outputs as CSV for further analysis.

---

## Key Features

1. **Data Upload & Validation**  
   Quickly load large Excel or CSV datasets (up to 10,000 MB by default) with column and date-format checks.

2. **Claims Insights**  
   Visual or tabular exploration of claims, including filters by **Statutory_Class** and time windows.

3. **Incremental Triangles**  
   Create incremental claim development triangles with flexible origin and development periods (year, quarter, or month).

4. **Cumulative Triangles**  
   Convert incremental data to cumulative format for chain-ladder and IBNR calculations.

5. **Modern Interface**  
   Uses [bs4Dash](https://rinterface.github.io/bs4Dash/) and a custom [bslib](https://rstudio.github.io/bslib/) theme for a clean, intuitive UI.

---

## Project Structure


1. **app.R**  
   - The main Shiny app file. Loads required libraries, sources modules, and constructs the dashboard UI + server logic.
2. **modules/**  
   - **dataOverviewModule.R**: Data upload and overview.  
   - **dataInsightsModule.R**: Additional data filtering, exploration, or visual summaries.  
   - **cummulativeTriangleModule.R**: Generate and download cumulative development triangles.  
   - **incrementalTriangleModule.R**: Generate and download incremental development triangles.
3. **www/**  
   - **css/custom_styles.css**: Contains additional custom styles.  
   - **images/kenbright.png**: Example logo image.

---

## Requirements

Requires **R ≥ 4.0** plus the following packages:

- **shiny**  
- **bs4Dash**  
- **tidyverse**  
- **bslib**  
- **DT**  
- **scales**  
- **lubridate**  
- **zoo**  
- **ChainLadder**  
- **shinycssloaders**  
- **plotly**  
- **readxl** (for Excel support)  

Install missing packages in R:
```r
install.packages(c(
  "shiny", 
  "bs4Dash", 
  "tidyverse", 
  "bslib", 
  "DT", 
  "scales", 
  "lubridate", 
  "zoo", 
  "ChainLadder", 
  "shinycssloaders", 
  "plotly",
  "readxl"
))
```
## Usage

1. **Launch the App:**
    ```r
    # In R or RStudio console
    shiny::runApp("path/to/loss-triangles-app")

    ```
2. **Navigate the Dashboard:**

   - **Data Overview:** Upload your claims dataset, check the preview table, and ensure fields/dates are parsed correctly.
   - **Claims Dashboard:** Explore data insights, charts, or aggregated metrics.
    - **Incremental Triangles:** Create and download incremental triangles based on user-selected time scale and statutory class.
    - **Cumulative Triangles:** Generate cumulative versions of the incremental triangles for further chain-ladder analysis.


## Modules

1. **Data Overview Module**
**UI (dataOverviewUI):**
- Displays a file upload control and a data table preview.
**Server (dataOverviewServer):**
- Validates columns, parses dates, and returns a reactive dataset to other modules.

2. **Data Insights Module**
**UI (dataInsightsUI):**
- Typically includes charts or summary tables for deeper claims insight.
- Includes an action button to trigger the bootstrapping analysis.
**Server (dataInsightsServer):**
- Reactively filters or summarizes data for in-app exploration.

3. **Incremental Triangles Module
**UI (incrTriUI):**
- Allows the user to select a statutory class, define a time scale (Yearly/Quarterly/Monthly), and generate an incremental claims development triangle.
**Server (incrTriServer):**
- Aggregates data by the chosen time scale.
- Generates a matrix or data frame representing incremental claim values over development periods.
- Offers a download button to export the triangle as CSV

4. **Cumulative Triangles Module
**UI (cumTriUI):**
- Similar interface for cumulative triangles.
**Server (incrTriServer):**
- Converts incremental values into cumulative claim values.
- Renders the resulting matrix for review and download.

## Contributing
- **Fork** the repository.
- **Create a branch** for your feature (git checkout -b feature/awesomeFeature).
- **Commit** your changes (git commit -m 'Add awesomeFeature').
- **Push** to your branch (git push origin feature/awesomeFeature).
- **Open a Pull Request** and describe your updates.