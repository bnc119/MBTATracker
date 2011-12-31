
enyo.kind({
	name:  "MyApps.BusTracker",
	kind: "enyo.HFlexBox",
	flex: 1,
	
	onResults: "processResults",
	
	components: [
	
	  // the webservice kind
	  {
	  	name: "mbtaService", kind: MyApps.mbtaService
	  },
         
      // the map kind 
      {
        name: "mapContainer", kind: MyApps.BingMapContainer,
        layoutKind: "HFlexLayout",
        flex: 1
      },
      
      // the location service kind
      {
      	name: "location", kind: "enyo.PalmService",
      	service: "palm://com.palm.location/", method: "getCurrentPosition",
      	onSuccess:  "locationSuccess", onFailure: "locationFailure"  
      }
     
      
    ],
    
    create: function() {
      this.inherited(arguments);
     
      // get mock gps data
      this.$.location.call();
            
  	},
  	  	
  	locationFailure: function(inSender, inResponse){
       console.log("locationFailure");
    },
    
    locationSuccess: function(inSender, inResponse){
      
      console.log("locationSuccess");
      
      // create a new panel to the left  
           
      if (inResponse && inResponse.results.latitude) {
        console.log("got location: "+inResponse.results.latitude+" "+inResponse.results.longitude);
      
        // center the map on current location
        this.$.mapContainer.centerMap(inResponse.results.latitude,inResponse.results.longitude,13);  
      }
    }, 
  	
    
    // process the webservice results
    processResults: function(inSender, xmlstring) {
      
      console.log("GotFeed OK");
      
      this.items = [];
      this.path = "/body/vehicle";
     
      // Convert the string to an XML object
      var xmlobject = (new DOMParser()).parseFromString(xmlstring, "text/xml");

      // Use xpath to parse xml object
      var nodes = document.evaluate(this.path, xmlobject, null, XPathResult.ANY_TYPE, null);

      var result = nodes.iterateNext();
      var i = 0;
      
      //clear the map
      this.$.mapContainer.clearAll();
      while (result)
      {
            
            //console.log("******* output " + result.attributes[0].nodeValue);
            // search for 77 bus
            //if(result.attributes[1].nodeValue == 77){
            	
				this.$.mapContainer.setMarker(result.attributes[0].nodeValue,   // id
							   result.attributes[1].nodeValue,   // routeTag
							   result.attributes[3].nodeValue,   // lat
							   result.attributes[4].nodeValue,	 // lon
							   result.attributes[5].nodeValue,	 // lag
							   result.attributes[7].nodeValue);  // heading
            	//found = true;
            //}
            //this.items[i] = result.attributes[0].nodeValue;
            //i++;
            result=nodes.iterateNext();
      }
    }
  
});