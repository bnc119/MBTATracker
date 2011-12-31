enyo.kind({
	name:  "MyApps.mbtaService",
	kind: enyo.VFlexBox,
	
	// list of events to fire, with their default handlers
	events: { 
      onResults: "processResults"
    },
  
	components: [
	
	  {name: "mbtaService", kind: "WebService", 
	  	  url: "http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=mbta&t=0",
          onSuccess: "gotFeed",
          onFailure: "gotFeedFailure"}
      
    ],
    
    create: function() {
      this.inherited(arguments);
        
	  // call the service immediately
	  this.callService();
			 
	  // schedule future updates		 
	  window.setInterval(enyo.hitch(this,"callService"),20000);
	         
  	},
  	
  	callService: function(){
  		
  		// call the service
  		this.$.mbtaService.call();
  		
  	},
  	
    // called when we we get a RSS feed successfully
    gotFeed: function(inSender, inResponse) {
      
      var xmlstring = inResponse;  
      
      // fire the "onResults" event
      this.doResults(xmlstring);
   
    },
      
    // called when we fail to get an RSS feed
    gotFeedFailure: function(inSender, inResponse) {
  	  // log an error
  	  console.log("GotFeed FAIL");
      
    },
  
});