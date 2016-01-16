library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)

shinyUI(fluidPage(navbarPage("OpenEvacMap", id="map",
                             
                             tabPanel("Map",
                                      
                                      #tags$head(tags$link(rel="icon", href="favicon.ico")),
                                      
                                      div(class="outer",
                                          tags$head(includeCSS("www/styles.css")),
                                          leafletOutput("mymap", width="100%", height="100%")
                                      )),
                             
                             tabPanel("À propos",
                                      includeMarkdown("about.md"))
)
))
