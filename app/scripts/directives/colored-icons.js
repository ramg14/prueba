'use strict';

angular.module('obrasMduytApp')
.directive('coloredIcons', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          callback: '=callback',
          scale:'=scale',
          class: '=class'
        },
        controller: function($scope,$element, $timeout, $http) {

            $scope.loading = true;
            var scale = $scope.scale;
            $scope.id = 'content-' + Math.floor((Math.random()*10000));
            var mainSelectorClass = "." + $scope.id;
            var drawLine = function(obra){

              //console.log('this is obra:',obra);

              var width  =$element[0].clientWidth;


              setTimeout(function() {

                       //create svg element
        d3.select($element[0]).html("");
        var svgDoc = d3.select($element[0]).append("svg")
        .attr("viewBox", "0 0 100 16");

        // Define the gradient
        var gradient = svgDoc.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("y1", "100%")
            .attr("y2", "0%")
            .attr("spreadMethod", "pad");

        // Define the gradient colors
        gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#f1662f")
            .attr("stop-opacity", 1);

        //define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
        svgDoc.append("defs")
            .append("g")
            .attr("id", "iconCustom")
          //  .attr('fill', 'url(#gradient)')
            .append("path")
                    .attr("d", "M3.5,2H2.7C3,1.8,3.3,1.5,3.3,1.1c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.4,0.2,0.7,0.6,0.9H1.1C0.7,2,0.4,2.3,0.4,2.6v1.9c0,0.3,0.3,0.6,0.6,0.6h0.2c0,0,0,0.1,0,0.1v1.9c0,0.3,0.2,0.6,0.3,0.6h1.3c0.2,0,0.3-0.3,0.3-0.6V5.3c0,0,0-0.1,0-0.1h0.2c0.3,0,0.6-0.3,0.6-0.6V2.6C4.1,2.3,3.8,2,3.5,2z");

        //background rectangle
        svgDoc.append("rect")
          .attr("width", 100)
          .attr("height", 10)
          .attr("fill","#efefef");

        //specify the number of columns and rows for pictogram layout
        var numCols = 22;
        var numRows = 1;

        //padding for the grid
        var xPadding = 2;
        var yPadding = 1;

        //horizontal and vertical spacing between the icons
        var hBuffer = 4.3;
        var wBuffer = 4.3;

        //generate a d3 range for the total number of required elements
        var myIndex = d3.range(numCols * numRows);



        //text element to display number of icons highlighted
        svgDoc.append("text")
            .attr("id", "txtValue")
            .attr("x", 1)
            .attr("y", 15)
            .attr("dy", 0)
            .text("Manzana");

        svgDoc.append("text")
            .attr("id", "txtValue")
            .attr("x", 30)
            .attr("y", 15)
            .attr("dy", 0)
            .text("Barrio");

      svgDoc.append("text")
            .attr("id", "txtValue")
            .attr("x", 60)
            .attr("y", 15)
            .attr("dy", 0)
            .text("Comuna");

        svgDoc.append("text")
            .attr("id", "txtValue")
            .attr("x", 85.5)
            .attr("y", 15)
            .attr("dy", 0)
            .text("Ciudad");

        //create group element and create an svg <use> element for each icon
        svgDoc.append("g")
            .attr("id", "pictoLayer")
            .selectAll("use")
            .data(myIndex)
            .enter()
            .append("use")
                .attr("xlink:href", "#iconCustom")
                .attr("id", function (d) {
                    return "icon" + d;
                })
                .attr("x", function (d) {
                    var remainder = d % numCols;//calculates the x position (column number) using modulus
                    return xPadding + (remainder * wBuffer);//apply the buffer and return value
                })
                  .attr("y", function (d) {
                      var whole = Math.floor(d / numCols)//calculates the y position (row number)
                      return yPadding + (whole * hBuffer);//apply the buffer and return the value
                  })
                .classed("iconPlain", true);


        var base = 1;
        var cantidad = 1;
        if ($scope.scale === "manoDeObra"){
          //Mano de obra: un tipito = 100
          base = 20;
          cantidad= obra.mano_obra;

        }
        if ($scope.scale === "beneficiarios"){
          //Beneficiarios: un tipito = 100 mil
          base = 50000;
          cantidad= obra.benficiarios;

        }

        var p = cantidad * 100/((base * numCols));
        //console.log(p);
        var data = { percent: p};

        function drawIsotype(dataObject) {
            var valueLit = dataObject.percent,
            total = numCols * numRows,
            valuePict = total * (dataObject.percent / 100),
            valueDecimal = (valuePict % 1);


            d3.selectAll("use").attr("fill", function (d, i) {
                if (d < valuePict - 1) {
                  return "#f1662f";
                } else if (d > (valuePict - 1) && d < (valuePict)){
                  gradient.append("svg:stop")
                    .attr("offset", (valueDecimal * 100) + '%')
                    .attr("stop-color", "#f1662f")
                    .attr("stop-opacity", 1);
                  gradient.append("svg:stop")
                    .attr("offset", (valueDecimal * 100) + '%')
                    .attr("stop-color", "#aaa")
                    .attr("stop-opacity", 1);
                 gradient.append("svg:stop")
                    .attr("offset", '100%')
                    .attr("stop-color", "#aaa")
                    .attr("stop-opacity", 1);
                  return "url(#gradient)";
                } else {
                  return "#aaa";
                }
            });
        };
        drawIsotype(data);
              }, 300);


            }

             $scope.callback(drawLine);


        },
        template: "<div class='colored'></div>"
    };

});
