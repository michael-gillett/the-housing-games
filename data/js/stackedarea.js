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
  var height = 650;
  var x_offset = 90;
  var y_offset = 50;

  var city_to_offset = {};
  var x_range = [y_offset];
  var y, x;

  var file_name = 'data/stackedArea/2012_sa.csv';

  // Create the svg chart that will house the visualization
  var svg = d3.select("#stackedarea").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

  // Create a y-scale for city distances
  var y = d3.scale.linear()
      .domain([1, 0])
      .range([y_offset, height - y_offset])

  var y_axis = d3.svg.axis()
      .orient("left")
      .scale(y)
      .tickFormat(function(d, i) {
        return (d * 100) + "%";
      });

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
    .attr("y", height - 10)
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

  var drawStackedArea = function(csvFile) {
    len_x = 0;
    dorms = []
    d3.csv(csvFile,
    function(d, i) {
      len_x = (i + 1)
      if (i == 0) {
        Object.keys(d).forEach(function(key, i) {
          dorms.push([key, i])
        });
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
        name = dorms[i][0]
        index = dorms[i][1]
        $("#available-dorms tbody").append("<tr><td data-id="+index+">"+name+"</td></tr>")
      }

      // Update the x axis based on the data
      x.domain([1, len_x]);
      x_axis.tickValues([1, len_x*0.25, len_x*0.5, len_x*0.75, len_x*1.0])

      // Update the y axis
      svg.select('.y_axis').transition().duration(1000).call(y_axis);

      // Draw the y axis
      svg.append('g')
         .attr('class', 'y_axis')
         .attr("transform", "translate(" + (x_offset - 17) + ",0)")
         .call(y_axis);

      // Draw the x axis
      svg.append('g')
         .attr('class', 'x_axis')
         .attr("transform", "translate(-15," + (height - 45) + ")")
         .call(x_axis);

      // Draw the area sections
      colors = lotsOfGrey(dorms.length)
      prev_sum = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf,0);
      for(i = 0; i < dorms.length; i++) {
        subdata = []
        data.forEach(function(d, j) {
          subdata.push({"x": d[0], "y":(d[i+1] + prev_sum[j]) / (d[dorms.length + 1] + 0.001), "y0": ((prev_sum[j]) / (d[dorms.length + 1] + 0.001))});
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


  // Update the chart to display the new data
  function updateData(csvFile) {
    len_x = 0
    dorms = []
    d3.csv(csvFile,
    function(d, i) {
      len_x = (i + 1)
      if (i == 0) {
        Object.keys(d).forEach(function(key, i) {
          dorms.push([key, i])
        });
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
      svg.selectAll('path').remove();

      // Dorm stuff
      dorms.sort()
      $("#available-dorms tbody tr").remove();
      for(i = 0; i < dorms.length; i++) {
        name = dorms[i][0];
        index = dorms[i][1];
        $("#available-dorms tbody").append("<tr><td data-id="+index+">"+name+"</td></tr>");
      }

      x.domain([1, len_x]);
      x_axis.tickValues([1, Math.floor(len_x*0.25), Math.floor(len_x*0.5), Math.floor(len_x*0.75), Math.floor(len_x*1.0)]);

      // Update the y-axis scale
      svg.select('.y_axis').transition().duration(1000).call(y_axis);
      svg.select('.x_axis').call(x_axis)

      // Draw the area sections
      colors = lotsOfGrey(dorms.length)
      prev_sum = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf,0);
      for(i = 0; i < dorms.length; i++) {
        subdata = []
        data.forEach(function(d, j) {
          subdata.push({"x": d[0], "y":(d[i+1] + prev_sum[j]) / (d[dorms.length + 1] + 0.001), "y0": ((prev_sum[j]) / (d[dorms.length + 1] + 0.001))});
          prev_sum[j] += d[i+1];
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

  // $('#select-first').change(function() {
  //   update();
  // });

  // $('#select-second').change(function() {
  //   update();
  // });

  // Initially display the chart
  drawStackedArea(file_name);

  var lastColor = ""
  var last = null;

  $(document).on("click", "td", function() {
    var id = $(this).data("id");
    highlightDorm(id, $(this));
  });

  $('#area-year').change(function() {
    lastColor = null;
    var year = $(this).val()
    updateData("data/stackedArea/"+year+"_sa.csv");
  });

  $(document).on("click", "[class^=area]", function() {
    var id = $(this).attr('class').split('-')[1];
    var row = $('*[data-id="'+id+'"]');
    row[0].scrollIntoView(false);
    highlightDorm(id, row);
  });

  function highlightDorm(id, row) {
    row.addClass("highlight-row");

    if (last != null) {
      old_id = last.data("id");
      $(".area-"+old_id).css("fill", lastColor);
      last.removeClass("highlight-row");
    }
    lastColor = $(".area-"+id).css("fill");
    last = row;

    dorm = row.text();
    $(".area-"+id).css("fill", "#e7b12d");
  }

})();
