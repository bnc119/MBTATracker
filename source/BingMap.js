enyo.kind({
	name:  "MyApps.BingMapContainer",
	kind: enyo.HFlexBox,
	components: [
	
	   {
	    name: "map", kind: "Map",  
        options: {
            enableClickableLogo: false,
            enableSearchLogo: true,
            showCopyright: false
        },
        layoutKind: "VFlexLayout",
        flex: 1,
        credentials: "AhLhTtHoByKb6HUk5DM-wEKEgHtcNou6KyqjsAYd9f7hJQuQAY2PxdXxtUaGIEJa"
       }
      
    ],
    
    create: function() {
      this.inherited(arguments);
             
  	},
  	
    centerMap: function(latitude, longitude, zoom_level){
  		
  		var bingMap = this.$.map.hasMap();
  	
		var c = new Microsoft.Maps.Location(latitude,longitude);
		var inOptions = null;
    	bingMap.setView({
        	center: c,
        	zoom: zoom_level
    	});
  		
  	},
  	
  	clearAll:  function(){
  	
  		this.$.map.clearAll();	
  	
  	},
  	
  	setMarker: function(id, route, lat, lon, lag, heading){
    	
    	var centre  = new Microsoft.Maps.Location(lat,lon);
    	
    	var pushpin = new Microsoft.Maps.Pushpin(centre, {text: route, 
    												      title:"Bus: "+id,  
    												      description: "Heading: "+heading+" degrees\nUpdated: "+lag+" seconds ago"});
    												      
    	
    	// change pushpin color depending on age of data:
    	// 0-30 seconds: green
    	// 30-60 seconds: yellow
    	// >60  seconds:  red
    	//var green = new Microsoft.Maps.Color(100, 0, 100, 100);
    	//pushpin.setIcon("../images/pin_orange.png");
    	 
    												      
    	// Create the infobox for the pushpin
        //pinInfobox = new Microsoft.Maps.Infobox(pushpin.getLocation(), 
		//        {visible: false, 
		//         offset: new Microsoft.Maps.Point(0,15)});											    
    	
    	
		//console.log(pinInfobox);
    	
    	// Add handler for the pushpin click event.
        // Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', this.displayInfobox);
        
        // Add handler for when map is moved
        // Microsoft.Maps.Events.addHandler(this.$.map.map, 'viewchange', this.hideInfobox());
    	
    	// place the pin and infobox
    	this.$.map.map.entities.push(pushpin);
    	//this.$.map.map.entities.push(this.pinInfobox);
    	
    	    	
    },
  	
});