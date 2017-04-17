import { Component, OnInit, NgZone } from '@angular/core';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';

declare var google: any;

// just an interface for type safety.
class Marker {
	constructor (public lat: number,
				public lng: number,
				public label?: string,
				public draggable: boolean = false) {

	}
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	constructor(
		private _loader: MapsAPILoader,
		private _zone: NgZone) {
	}
	
	ngOnInit(): void {
		this.autocomplete();
	}
	
	autocomplete() {
		this._loader.load().then(() => {
				var autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteInput"), {});
				google.maps.event.addListener(autocomplete, 'place_changed', () => {
						this._zone.run(() => {
							var place = autocomplete.getPlace();
							
							this.markers.push(new Marker (
								place.geometry.location.lat(),
								place.geometry.location.lng(),
								place.name,
								false
							));
							
							this.lat = place.geometry.location.lat();
							this.lng = place.geometry.location.lng();
							
							console.log(place);
							console.log(this.markers);
						});
				});
		});
	}
	
	// google maps zoom level
	zoom: number = 8;
	
	// initial center position for the map
	lat: number = 48.8587741;
	lng: number = 2.2074741;
	
	clickedMarker(label: string, index: number) {
		console.log(`clicked the marker: ${label || index}`)
	}
	
	mapClicked($event: any) {
		this.markers.push(new Marker (
			$event.coords.lat,
			$event.coords.lng
		));
	}
	
	markerDragEnd(m: Marker, $event: any) {
		console.log('dragEnd', m, $event);
	}
	
	markers: Marker[] = [];
}
