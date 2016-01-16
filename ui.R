library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)

queryResults <-
  GET("http://api.openevacmap.org/v0/maps-info?lat=48.85&lon=2.33")
content <-
  as.character(content(queryResults, "text", encoding = "UTF-8"))
content <- str_replace_all(content,"None","\"None\"")
content <- fromJSON(content)
content <- data.frame(t(sapply(content,c)))
content$lat <- as.numeric(content$lat)
content$lon <- as.numeric(content$lon)
content$id_bat <-
  apply(content, 1, function(x) {
    digest(x$address_label,algo = "md5")
  })

unique_content <- content[!duplicated(content$address_label),]

shinyUI(fluidPage(navbarPage("OpenEvacMap", id="map",
                             
                             tabPanel("Map",
                                      
                                      tags$head(tags$link(rel="icon", href="favicon.ico")),
                                      
                                      div(class="outer",
                                          tags$head(includeCSS("www/styles.css")),
                                          leafletOutput("mymap", width="100%", height="100%")
                                      ),
                                      
                                      absolutePanel(id = "controls", class = "panel panel-default", fixed = TRUE,
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
