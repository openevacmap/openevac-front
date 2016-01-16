library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)
library(httr)
library(jpeg)

shinyServer(function(input, output) {
  
  # Leaflet
  output$mymap <- renderLeaflet({
    leaflet() %>%
      addProviderTiles("OpenStreetMap.HOT",
                       options = providerTileOptions(noWrap = TRUE)) %>% setView(lng = 2.3572111, lat = 48.8581874, zoom = 15)
  })
  
  # Nom du bâtiment
  output$name <- renderText({ 
    "CRI Site Charles V"
  })

  # Images
  output$plan <- renderImage({
    size <- 400
    imgName <- "images/plan1.JPG"
    img <- readJPEG(imgName)
    list(
      contentType = 'image/jpg',
      width = size,
      height = dim(img)[1]/dim(img)[2]*size,
      src = "images/plan1.JPG",
      alt = "Plan"
    )
  }, deleteFile = FALSE)
  
})
