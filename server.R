library(shiny)
library(leaflet)
library(rCharts)
library(reshape2)
require(httr)
library(jpeg)
library(rjson)
library(stringr)
library(digest)

queryResults <-
  GET("http://api.openevacmap.org/v0/maps-info?lat=48.85&lon=2.33&nb_addr=0&nb_maps=999")
content <-
  as.character(content(queryResults, "text", encoding = "UTF-8"))
content <- str_replace_all(content,"None","\"None\"")
content <- fromJSON(content)
content <- data.frame(t(sapply(content,c)))
content$lat <- as.numeric(content$lat)
content$lon <- as.numeric(content$lon)
content <- content[content$id != "NULL",]

content$id_bat <-
  apply(content, 1, function(x) {
    digest(x$address_label,algo = "md5")
  })

unique_content <- content[!duplicated(content$address_label),]


shinyServer(function(input, output, session) {
  # Points
  points <- eventReactive(input$recalc, {
    unique_content[c("lat","lon")]
  }, ignoreNULL = FALSE)
  
  # Leaflet
  output$mymap <- renderLeaflet({
    leaflet() %>%
      addProviderTiles("OpenStreetMap.HOT",
                       options = providerTileOptions(noWrap = TRUE)) %>% setView(lng = 2.3072111, lat = 48.8751874, zoom = 13) %>%
      addMarkers(data = points(),layerId = unique_content$id_bat)
  })
  
  # Nom du batiment
  output$name <- renderText({
    "Sélectionnez un bâtiment"
  })
  
  observeEvent(input$mymap_marker_click, {
    # http://stackoverflow.com/questions/33526256/dynamically-display-images-from-upload-in-shiny-ui
    output$plan <- renderUI({
      
      
      output$name<-renderText({})
      output$address <- renderText({
        content$address_label[content$id_bat == input$mymap_marker_click$id][[1]]
      })
      
      images <- content[content$id_bat == input$mymap_marker_click$id,]
      image_output_list <- 
        apply(images, 1
              ,
               function(x)
               {
                 imgname <- paste("images/",x$id,".jpg", sep="")
                 
                 if(!file.exists(imgname)){
                   url <- paste("http://api.openevacmap.org/v0/map?preview=1&id=",x$id,sep ="")[1]
                   print(imgname)
                   download.file(url,imgname)
                 }
                 imageOutput(imgname)
               })
      
    do.call(tagList, image_output_list)
    

    size <- 400
    result <- apply(images, 1,
          function(x)
          {
            local({
              
              imgname <- paste("images/",x$id,".jpg", sep="")
              
             img <- readJPEG(imgname)
              output[[imgname]] <- renderImage({
                list(src = imgname,alt = "Image failed to render", width = size,
                     height = dim(img)[1] / dim(img)[2] * size)
              }, deleteFile = FALSE)
            })
          })
    
    })
  })
  
  
})
