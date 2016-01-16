library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)

shinyServer(function(input, output) {
  
  output$mymap <- renderLeaflet({
    leaflet() %>%
      addProviderTiles("Hydda.Full",
                       options = providerTileOptions(noWrap = TRUE)
      ) %>% setView(lng = 2.3572111, lat = 48.8581874, zoom = 15)
  })
  
})
