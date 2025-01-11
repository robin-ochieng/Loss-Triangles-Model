# Load necessary libraries
library(shiny)
library(bs4Dash)
library(tidyverse)
library(bslib)
library(DT)
library(scales)
library(lubridate)
library(zoo)
library(ChainLadder)
library(shinycssloaders)
library(plotly)

options(shiny.maxRequestSize = 10000000 * 1024^2)  # 10000000 MB

#Sourcing the Modules to the main App
source("modules/dataOverviewModule.R", local = TRUE)[1]
source("modules/dataInsightsModule.R", local = TRUE)[1]
source("modules/cummulativeTriangleModule.R", local = TRUE)[1]
source("modules/incrementalTriangleModule.R", local = TRUE)[1]

# Define a custom theme using bslib
my_theme <- bs_theme(
  bg = "#202123", 
  fg = "#E1E1E1", 
  primary = "#EA80FC", 
  secondary = "#00BFA5",
  base_font = font_google("Mulish"),
  heading_font = font_google("Mulish"),
  code_font = font_google("Mulish"),
  navbar_bg = "#333333",  # Darker background for the navbar for contrast
  navbar_fg = "#ffffff"  # White text color for readability
)

# UI
ui <- bs4DashPage(
  title = "Loss Triangles Dashboard",
  dark = NULL,
  help = NULL,
  fullscreen = FALSE,
  scrollToTop = TRUE,
  freshTheme = my_theme,
  header = bs4DashNavbar(
    fixed = "TRUE",
    status = "white",
    skin = "dark",
    sidebarIcon = NULL,
    controlbarIcon = NULL,
    tags$li(
      class = "text-center header-title-container",  # Added a new class for more specific styling
      tags$h4("Loss Triangles Dashboard", class = "header-title")
    ),
    tags$li(
      class = "clock-container",
      actionButton(
          inputId = "toggle_instructions_btn", 
          label   = "Show Data Upload Guide", 
          class   = "btn btn-primary btn-primary-custom-show-instructions"
      ),
    # Tour button on the right
    actionButton(
      inputId = "startTour",
      label   = "Take a Tour",
      icon    = icon("compass"),  # Font Awesome icon for "tour/compass"
      class   = "control-button"  # custom class from your CSS
    ),
    tags$span(
      id = "dynamic-clock"
      ),
    )
  ),
  sidebar = bs4DashSidebar(
    id = "sidebar",
    skin = "light",
    tags$div(
      class = "menu-container",
    bs4SidebarMenu(
      bs4SidebarMenuItem("Data Overview", tabName = "data_overview", icon = icon("table")),
      bs4SidebarMenuItem("Claims Dashboard", tabName = "data_insights", icon = icon("chart-bar")),
      bs4SidebarMenuItem("Incremental Triangles", tabName = "incremental_triangles", icon = icon("shapes")),
      bs4SidebarMenuItem("Cumulative Triangles", tabName = "cumulative_triangles", icon = icon("shapes"))
    )),
    div(class = "sidebar-logo",
        img(src = "images/kenbright.png")
    )
  ),
  body = bs4DashBody(
    tags$head(
      includeCSS("www/css/custom_styles.css"),
      tags$link(href = "https://fonts.googleapis.com/css?family=Mulish", rel = "stylesheet"),
      tags$link(
        rel = "stylesheet",
        href = "https://cdn.jsdelivr.net/npm/intro.js/minified/introjs.min.css"
      ),
      tags$script(
        src = "https://cdn.jsdelivr.net/npm/intro.js/minified/intro.min.js"
      ),
      tags$script(src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"),
      tags$link(rel = "shortcut icon", href = "favicon/kenbright.ico", type = "image/x-icon"),
      tags$script(src = "js/custom.js")
    ),
    bs4TabItems(
      # Data Overview Tab
      bs4TabItem(
        tabName = "data_overview",
        dataOverviewUI("data_overview_id")
      ),
      # Data Display Tab
      bs4TabItem(
        tabName = "data_insights",
        dataInsightsUI("data_insights_id")
      ),
      # Cumulative Triangles Tab
      bs4TabItem(
        tabName = "incremental_triangles",
        incrTriUI("incremental_triangles_id")
      ),
      # Cumulative Triangles Tab
      bs4TabItem(
        tabName = "cumulative_triangles",
        cumTriUI("cumulative_triangles_id")
      )
    )
  )
)

# Server
server <- function(input, output, session) {

   data <- dataOverviewServer("data_overview_id") 

   dataInsightsServer("data_insights_id", data)
   
   incrTriServer("incremental_triangles_id", data)
  
   cumTriServer("cumulative_triangles_id", data)

}

# Run the application
shinyApp(ui, server)
