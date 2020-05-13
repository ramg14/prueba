"use strict";

angular.module("obrasMduytApp").directive("selectorHome", function() {
	return {
		restrict: "E",
		scope: {
			list: "=",
			updateFn: "&",
			selectedGroup: "="
		},
		template:
			"<div id='selector-home' class='row' ng-show='selectedGroup'><div ng-repeat='(key, g) in list' class='col-xs-3 selector' ng-class='{\"selectorSelected\":selectedGroup==g.id}'><a ng-click='updateFn({group:g.id})'><img ng-src=\"{{'images/selectores/'+g.id+'.svg'}}\"/><span>{{g.name}}</span></a></div></div>",
		replace: true,
		link: function(scope, elm, attrs) {}
	};
});
