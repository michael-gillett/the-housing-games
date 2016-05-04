(function() {
  var category_to_color = {".first": 'rgba(244,67,54,0.7)', ".second": 'rgba(33,150,243,0.5)'};

  function lotsOfGrey(total) {
    var THRESHOLD = 30
    r = []
    for(i = 0; i < total; i++) {
      switch(i % 3) {
        case 0: grey = 160; break;
        case 1: grey = 180; break;
        case 2: grey = 200; break;
      }
      r.push(grey)
    }
    for (i = 0; i < total; i++) {
      r[i] = "rgb("+r[i]+","+r[i]+","+r[i]+")"
    }
    return r;
  }

  var width = 1000;
  var height = 567;
  var x_offset = 85;
  var y_offset = 40;

  var city_to_offset = {};
  var x_range = [y_offset];
  var y, x;

  var file_name = 'data/stackedArea/2013_sa.csv';

  // Create the svg chart that will house the visualization
  var svg = d3.select("#stackedarea").append("svg")
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
        .attr("x", - height / 2 - 110)
        .attr("y", 25)
        //.attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size","12pt")
        .text("Percent of Total Rooms Remaining");

 // Create a method for drawing an area segment
  var area = d3.svg.area()
      .interpolate("basis")
      .x(function(d)  { return x(d.x); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y); });

  var fundsChart = function(category, csvFile) {
    len_x = 0;
    dorms = []
    d3.csv(csvFile,
    function(d, i) {
      len_x = (i + 1)
      if (i == 0) {
        dorms = Object.keys(d)
      }
      result = [];
      result.push(i);
      Object.keys(d).forEach(function(key) {
        result.push(+d[key]);
      });
      total = result.slice(1,result.length).reduce(function(a,b) {return a + b});
      result.push(total);
      return result;
    },
    function(error, data) {
      dorms.sort()
      for(i = 0; i < dorms.length; i++) {
        dorm = dorms[i]
        $("#available-dorms tbody").append("<tr><td data-id="+i+">"+dorm+"</td></tr>")
      }

      // Update the x axis based on the data
      x.domain([1, len_x]);
      x_axis.tickValues([1, len_x*0.25, len_x*0.5, len_x*0.75, len_x*1.0])

      // Update the y axis
      y.domain([d3.max(data, function(d) {
        return 1;
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

      // Draw the area sections
      colors = lotsOfGrey(dorms.length)
      prev_sum = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf,0);
      for(i = 0; i < dorms.length; i++) {
        subdata = []
        data.forEach(function(d, j) {
          // console.log(prev_sum[j])
          subdata.push({"x": d[0], "y":(d[i+1] + prev_sum[j]) / d[dorms.length + 1], "y0": ((prev_sum[j]) / d[dorms.length + 1])})
          prev_sum[j] += d[i+1]
        });

        svg.append("path")
          .attr('class', 'area-'+i)
          .data([subdata])
          .attr("d", area)
          .style("fill", colors[i])
          .style("stroke", "#888");
      }
    });
  }
  // Initially display the charr
  fundsChart('all', file_name);

  var lastColor = ""
  var last = null;

  $(document).on("click", "td", function() {
    id = $(this).data("id");
    $(this).addClass("highlight-row");

    if (last != null) {
      old_id = last.data("id");
      $(".area-"+old_id).css("fill", lastColor);
      last.removeClass("highlight-row");
    }
    lastColor = $(".area-"+id).css("fill");
    last = $(this);

    dorm = $(this).text();
    $(".area-"+id).css("fill", "orange");


  });

  // $(document).on("mouseleave", "td", function() {
  //   dorm = $(this).text();
  //   id = $(this).data("id");
  //   $(".area-"+id).css("fill", lastColor);
  // });

  // Update the chart to display the new data
  function updateData(dorm1, dorm2, csvFile) {
    len_x = 0
    d3.csv(csvFile,
    function(d, i) {
      len_x = (i + 1)
      if (i == 0) {
        dorms = Object.keys(d)
      }
      result = [];
      result.push(i);
      Object.keys(d).forEach(function(key) {
        result.push(+d[key]);
      });
      return result;
    },
    function(error, data) {
      console.log(data)
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
      colors = lotsOfGrey(dorms.length)
      prev_sum = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf,0);
      for(i = 0; i < dorms.length; i++) {
        subdata = []
        data.forEach(function(d, j) {
          // console.log(prev_sum[j])
          subdata.push({"x": d[0], "y":(d[i+1] + prev_sum[j]) / d[dorms.length + 1], "y0": ((prev_sum[j]) / d[dorms.length + 1])})
          prev_sum[j] += d[i+1]
        });

        svg.append("path")
          .attr('class', 'area')
          .data([subdata])
          .attr("d", area)
          .style("fill", colors[i])
          .style("stroke", "#888");
      }
    });
  }

  // $('#select-first').change(function() {
  //   update();
  // });

  // $('#select-second').change(function() {
  //   update();
  // });

  // $('#select-year').change(function() {
  //   update();
  // });

  // function update() {
  //   $('.vs').show()
  //   dorm1 = $("#select-first").val();
  //   dorm2 = $("#select-second").val();
  //   year = $("#select-year").val();
  //   $('.first').text(dorm1);
  //   $('.second').text(dorm2);
  //   $('#year').text(year)

  //   updateData(dorm1, dorm2, "data/"+year+"_sa.csv");
  // }

})();
