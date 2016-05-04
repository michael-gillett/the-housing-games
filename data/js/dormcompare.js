(function() {

  var category_to_color = {".first": 'rgba(244,67,54,0.7)', ".second": 'rgba(33,150,243,0.5)'};

  var width = 1100;
  var height = 567;
  var x_offset = 85;
  var y_offset = 40;

  var city_to_offset = {};
  var x_range = [y_offset];
  var y, x;

  var file_name = 'data/stackedArea/2006_sa.csv';

  // Create the svg chart that will house the visualization
  var svg = d3.select("#dormcompare").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

  // Create a y-scale for city distances
  var y = d3.scale.linear()
      .range([y_offset, height - y_offset]);

  var y_axis = d3.svg.axis()
          .orient("left")
          .scale(y);

  // Create an x-scale for time
  var x = d3.scale.linear()
      .domain([1, 100])
      .range([x_offset, width - x_offset]);

  var x_axis = d3.svg.axis()
      .orient("bottom")
      .tickValues([1, 25, 50, 75, 100])
      .tickFormat(function(d, i) {
        return (i*25) + "%";
      })
      .scale(x);

  // X-axis label
  svg.append("text")
    .attr("class", "xlabel")
    .attr("text-anchor", "center")
    .attr("x", width / 2 - 75)
    .attr("y", height - 2)
    .style("font-size","12pt")
    .text("Lottery Progress");

  // Y-axis label
  svg.append("text")//-->>this is the text that gets cut off
        .attr("class", "ylabel")
        .attr("text-anchor", "center")
        .attr("x", - height / 2 - 50)
        .attr("y", 25)
        //.attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size","12pt")
        .text("Rooms Remaining");

 // Create a method for drawing an area segment
  var area = d3.svg.area()
      .interpolate("basis")
      .x(function(d)  { return x(d.x); })
      .y0(function(d) { return y(0); })
      .y1(function(d) { return y(d.y); });

  var fundsChart = function(category, csvFile) {
    len_x = 0;
    dorms = []
    d3.csv(csvFile,
    function(d, i) {
      if (i == 0)
        dorms = Object.keys(d)
      len_x = (i + 1)
      return [i, +d['Gregorian Quad A'], +d['Young Orchard #2']];
    },
    function(error, data) {
      // Update the select drop downs
      $.each(dorms, function(key, value) {
        $('#select-first')
         .append($("<option></option>")
            .attr("value", value)
            .text(value));
        $('#select-second')
         .append($("<option></option>")
            .attr("value", value)
            .text(value));
        if (value == 'Gregorian Quad A') {
          $('#select-first').val(value);
        }
        if (value == 'Young Orchard #2') {
          $('#select-second').val(value);
        }
      });

      // Update the x axis based on the data
      x.domain([1, len_x]);
      x_axis.tickValues([1, len_x*0.25, len_x*0.5, len_x*0.75, len_x*1.0])

      // Update the y axis
      y.domain([d3.max(data, function(d) {
        return Math.max(d[1], d[2]);
      }), 0]);
      svg.select('.y_axis').transition().duration(1000).call(y_axis);

      // Draw the y axis
      svg.append('g')
         .attr('class', 'y_axis')
         .attr("transform", "translate(" + (x_offset - 17) + ",0)")
         .call(y_axis);

      // Draw the x axis
      svg.append('g')
         .attr('class', 'x_axis')
         .attr("transform", "translate(-15," + (height - 36) + ")")
         .call(x_axis);

      // Legend
      // View events
      // svg.append("circle")
      //   .attr("class", "legend_view")
      //   .attr("r", 10)
      //   .attr("fill-opacity", 0.7)
      //   .attr("fill", category_to_color["all"])
      //   .attr("cx", 150)
      //   .attr("cy", 40)

      // svg.append("text")
      //   .attr("dx", 170)
      //   .attr("dy", 45)
      //   .text("View Events")

      // // Fund events
      // svg.append("circle")
      //   .attr("class", "legend_fund")
      //   .attr("r", 10)
      //   .attr("fill", category_to_color["all"])
      //   .attr("cx", 150)
      //   .attr("cy", 70)

      // svg.append("text")
      //   .attr("dx", 170)
      //   .attr("dy", 75)
      //   .text("Fund Events")

      // Draw the area sections
      for(i = 0; i < 2; i++) {
        subdata = []
        data.forEach(function(d) {
          subdata.push({"x": d[0], "y":d[i+1]})
        })

        var c = (i == 0) ? 'first' : 'second';
        svg.append("path")
          .attr('class', c)
          .data([subdata])
          .attr("d", area)
          // .style("fill-opacity", 0.5)
          .style("fill", category_to_color['.'+c]);
      }
    });
  }
  // Initially display the charr
  fundsChart('all', file_name);

  // Update the chart to display the new data
  function updateData(dorm1, dorm2, csvFile) {
    len_x = 0
    d3.csv(csvFile,
    function(d, i) {
      len_x = (i + 1)
      if (i == 0) {
        dorms = Object.keys(d)
      }
      if (dorms.indexOf(dorm1) == -1) {
        if (i == 0) {
          $('.first').text('')
          $('.vs').hide()
          alert(dorm1 + ' was not available in the ' + $('#select-year').val() + ' housing lottery.')
        }
        return [i, 0, +d[dorm2]];
      }
      if (dorms.indexOf(dorm2) == -1) {
        if (i == 0) {
          $('.second').text('')
          $('.vs').hide()
          alert(dorm2 + ' was not available in the ' + $('#select-year').val() + ' housing lottery.')
        }
        return [i, +d[dorm1], 0];
      }


      return [i, +d[dorm1], +d[dorm2]];
    },
    function(error, data) {
      // Update the y axis
      y.domain([d3.max(data, function(d) {
        return Math.max(d[1], d[2]);
      }), 0]);

      x.domain([1, len_x]);
      x_axis.tickValues([1, Math.floor(len_x*0.25), Math.floor(len_x*0.5), Math.floor(len_x*0.75), Math.floor(len_x*1.0)])
      // svg.select('.x_axis').transition().duration(1000).call(x_axis);

      // svg.select('.x_axis').transition().duration(1000).call(x_axis);
      // Update the y-axis scale
      svg.select('.y_axis').transition().duration(1000).call(y_axis);
      svg.select('.x_axis').call(x_axis)

      // Update the select drop downs
      $('#select-first').find('option').remove().end()
      $('#select-second').find('option').remove().end()
      $.each(dorms, function(key, value) {
        $('#select-first')
         .append($("<option></option>")
            .attr("value", value)
            .text(value));
        $('#select-second')
         .append($("<option></option>")
            .attr("value", value)
            .text(value));
      });
      $('#select-first').val(dorm1)
      $('#select-second').val(dorm2)

      // Update the legend colors
      // svg.select('.legend_view')
      //   .transition().duration(1000)
      //   .attr('fill-opacity', 0.7)
      //   .attr('fill', category_to_color[category]);
      // svg.select('.legend_fund')
      //   .transition().duration(1000)
      //   .attr('fill', category_to_color[category]);


      // Draw the area sections
      for(i = 0; i < 2; i++) {
        subdata = []
        data.forEach(function(d) {
          subdata.push({"x": d[0], "y": d[i+1]})
        })

        var c = (i == 0) ? '.first' : '.second';
        svg.select(c).datum(subdata)
          .transition().duration(1000)
          .attr("d", area)
          .style("fill", category_to_color[c]);
      }

      // Update the drawn areas
      // for(i = 0; i < 2; i++) {
      //   subdata = [];
      //   data.forEach(function(d) {
      //     subdata.push({"x": d[0], "y":d[i+1]});
      //   })
      //   var c = (i == 0) ? '.view-event' : '.fund-event';

      //   svg.select(c).datum(subdata)
      //     .transition().duration(1000)
      //     .attr("d", area)
      //     .style("fill-opacity", (0.7 + i * 0.3))
      //     .style("fill", category_to_color[category]);
      // }
    });
  }

  $('#select-first').change(function() {
    update();
  });

  $('#select-second').change(function() {
    update();
  });

  $('#select-year').change(function() {
    update();
  });

  function update() {
    $('.vs').show()
    dorm1 = $("#select-first").val();
    dorm2 = $("#select-second").val();
    year = $("#select-year").val();
    $('.first').text(dorm1);
    $('.second').text(dorm2);
    $('#year').text(year)

    updateData(dorm1, dorm2, "data/stackedArea/"+year+"_sa.csv");
  }

})();
