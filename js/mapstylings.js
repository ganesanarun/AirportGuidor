// map Style
var mapStyle = [
	{
		stylers: [
			{ saturation : -100 },
			{ gamma: 1}
		]
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{ visibility: 'off' }
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{ visibility: 'simplified' }
		]
	},
	{
		featureType: 'water',
		stylers: [
			{ visibility: 'on' },
			{ saturation: 50 },
			{ gamma: 0 },
			{ hue: '#50a5d1' }
		]
	},
	{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ color: '#e2e2e2' }
		]
	}
];

// shift worker style
// https://snazzymaps.com/style/27/shift-worker
var shiftWorkerStyle = [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}];
// https://snazzymaps.com/style/6618/cladme
var cladmeStyle = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#4f595d"},{"visibility":"on"}]}];