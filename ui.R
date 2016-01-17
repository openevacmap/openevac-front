library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)

shinyUI(fluidPage(navbarPage("OpenEvacMap", id="map",
                             
                             tabPanel("Map",
                                      
                                      tags$head(tags$link(rel="icon", href="favicon.ico")),
                                      
                                      div(class="outer",
                                          tags$head(includeCSS("www/styles.css")),
                                          leafletOutput("mymap", width="100%", height="100%")
                                      ),
                                      
                                      absolutePanel(id = "controls", class = "panel panel-default", fixed = FALSE,
                                                    draggable = TRUE, top = 60, left = 20, right = "auto", bottom = "auto",
                                                    width = "auto", height = "auto",
                                                    h3(textOutput("name"),align="center"),
                                                    textOutput("address"),align="center",
                                                    uiOutput('plan')
                                      
                             )
                             
),

tabPanel("À propos",
         includeMarkdown("about.md"))
)
))
