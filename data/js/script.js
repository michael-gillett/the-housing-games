$(function() {
  $('.splash').delay(4000).fadeTo(600, 0, function() {});

  // This example creates a simple polygon representing the Bermuda Triangle.
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 41.8268, lng: -71.4000},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      minZoom: 16,
      maxZoom: 19,
    });

    // var andrews = [
    //   {lat: 41.829983, lng: -71.402798},
    //   {lat: 41.830391, lng: -71.402857},
    //   {lat: 41.830377, lng: -71.403117},
    //   {lat: 41.830513, lng: -71.403145},
    //   {lat: 41.830531, lng: -71.402889},
    //   {lat: 41.830635, lng: -71.402906},
    //   {lat: 41.830681, lng: -71.402194},
    //   {lat: 41.830574, lng: -71.402180},
    //   {lat: 41.830593, lng: -71.401928},
    //   {lat: 41.830465, lng: -71.401911},
    //   {lat: 41.830442, lng: -71.402161},
    //   {lat: 41.830031, lng: -71.402110},
    //   {lat: 41.830018, lng: -71.402287},
    //   {lat: 41.830360, lng: -71.402354},
    //   {lat: 41.830344, lng: -71.402637},
    //   {lat: 41.829994, lng: -71.402623}
    // ];

    var dorms = {
      "111 Brown Street": brown_street_111,
      "315 Thayer": thayer_315,
      "Barbour Hall": barbour,
      "Barbour Hall Apartments": null,
      "Caswell Hall": caswell,
      "Chapin House": chapin,
      "Diman House": diman,
      "Grad Center A": gradcenter_a,
      "Goddard House": goddard,
      "Grad Center B": gradcenter_b,
      "Grad Center C": gradcenter_c,
      "Grad Center D": gradcenter_d,
      "Gregorian Quad A": vgqa,
      "Gregorian Quad B": vgqb,
      "Harkness House": harkness,
      "Hegeman": hegeman,
      "Hope College": hope,
      "Littlefield Hall": littlefield,
      "Machado House": machado,
      "Marcy House": marcy,
      "Minden": minden,
      "New Pembroke #1": new_pembroke_1,
      "New Pembroke #2": new_pembroke_2,
      "New Pembroke #3": new_pembroke_3,
      "New Pembroke #4": new_pembroke_4,
      "Olney House": olney,
      "Perkins Hall": perkins,
      "Plantations House": plantations,
      "Sears House": sears,
      "Slater Hall": slater,
      "Wayland House": wayland,
      "Young Orchard #10": young_orchard_10,
      "Young Orchard #2": young_orchard_2,
      "Young Orchard #4": young_orchard_4
    };

    var brown_street_111 = [
      {lat: 41.829954, lng: -71.403391},
      {lat: 41.829958, lng: -71.403342},
      {lat: 41.829974, lng: -71.403340},
      {lat: 41.829977, lng: -71.403267},
      {lat: 41.829964, lng: -71.403263},
      {lat: 41.829963, lng: -71.403220},
      {lat: 41.829869, lng: -71.403216},
      {lat: 41.829866, lng: -71.403291},
      {lat: 41.829875, lng: -71.403290},
      {lat: 41.829874, lng: -71.403385}
    ];

    var hegeman = [
      {lat: 41.826075, lng: -71.401027},
      {lat: 41.826096, lng: -71.400788},
      {lat: 41.825699, lng: -71.400747},
      {lat: 41.825716, lng: -71.400502},
      {lat: 41.825605, lng: -71.400487},
      {lat: 41.825579, lng: -71.400883},
      {lat: 41.825975, lng: -71.400942},
      {lat: 41.825973, lng: -71.401018}
    ];

    var machado = [
      {lat: 41.830190, lng: -71.405223},
      {lat: 41.830228, lng: -71.404327},
      {lat: 41.830015, lng: -71.404308},
      {lat: 41.829974, lng: -71.405211}
    ];


    var plantations = [
      {lat: 41.830699, lng: -71.401840},
      {lat: 41.830704, lng: -71.401678},
      {lat: 41.830513, lng: -71.401650},
      {lat: 41.830505, lng: -71.401829}
    ];

    var chapin = [
      {lat: 41.824795, lng: -71.400532},
      {lat: 41.824805, lng: -71.400365},
      {lat: 41.824173, lng: -71.400288},
      {lat: 41.824160, lng: -71.400461}
    ];

    var hope = [
      {lat: 41.826931, lng: -71.403954},
      {lat: 41.826937, lng: -71.403791},
      {lat: 41.826581, lng: -71.403779},
      {lat: 41.826579, lng: -71.403949}
    ];

    var slater = [
      {lat: 41.825891, lng: -71.403944},
      {lat: 41.825893, lng: -71.403770},
      {lat: 41.825665, lng: -71.403762},
      {lat: 41.825659, lng: -71.403938}
    ];

    var vgqa = [
      {lat: 41.823684, lng: -71.399984},
      {lat: 41.823815, lng: -71.400001},
      {lat: 41.823862, lng: -71.399318},
      {lat: 41.823125, lng: -71.399231},
      {lat: 41.823114, lng: -71.399410},
      {lat: 41.823720, lng: -71.399474}
    ];

    var vgqb = [
      {lat: 41.823583, lng: -71.399962},
      {lat: 41.823083, lng: -71.399893},
      {lat: 41.823118, lng: -71.399449},
      {lat: 41.823232, lng: -71.399463},
      {lat: 41.823215, lng: -71.399729},
      {lat: 41.823597, lng: -71.399780}
    ];

    var littlefield = [
      {lat: 41.826031, lng: -71.402145},
      {lat: 41.826044, lng: -71.401939},
      {lat: 41.825800, lng: -71.401909},
      {lat: 41.825793, lng: -71.401967},
      {lat: 41.825499, lng: -71.401935},
      {lat: 41.825490, lng: -71.402085}
    ];

    var minden = [
      {lat: 41.827345, lng: -71.399223},
      {lat: 41.827351, lng: -71.399121},
      {lat: 41.827291, lng: -71.399107},
      {lat: 41.827313, lng: -71.398847},
      {lat: 41.827381, lng: -71.398855},
      {lat: 41.827389, lng: -71.398752},
      {lat: 41.827204, lng: -71.398727},
      {lat: 41.827196, lng: -71.398839},
      {lat: 41.827160, lng: -71.398835},
      {lat: 41.827136, lng: -71.399148},
      {lat: 41.827166, lng: -71.399153},
      {lat: 41.827165, lng: -71.399199}
    ];

    var sears = [
      {lat: 41.825304, lng: -71.402150},
      {lat: 41.825372, lng: -71.401316},
      {lat: 41.825248, lng: -71.401294},
      {lat: 41.825178, lng: -71.402134}
    ];

    var wayland = [
      {lat: 41.825278, lng: -71.402601},
      {lat: 41.825296, lng: -71.402212},
      {lat: 41.824714, lng: -71.402166},
      {lat: 41.824688, lng: -71.402536}
    ];

    var olney = [
      {lat: 41.824848, lng: -71.402080},
      {lat: 41.824864, lng: -71.401801},
      {lat: 41.824746, lng: -71.401785},
      {lat: 41.824734, lng: -71.401935},
      {lat: 41.824269, lng: -71.401839},
      {lat: 41.824253, lng: -71.402002},
      {lat: 41.824846, lng: -71.402078}
    ];

    var chapin = [
      {lat: 41.824792, lng: -71.400528},
      {lat: 41.824802, lng: -71.400367},
      {lat: 41.824176, lng: -71.400289},
      {lat: 41.824162, lng: -71.400458}
    ];

    var goddard = [
      {lat: 41.824342, lng: -71.401098},
      {lat: 41.824352, lng: -71.400935},
      {lat: 41.824140, lng: -71.400905},
      {lat: 41.824100, lng: -71.401238},
      {lat: 41.823902, lng: -71.401206},
      {lat: 41.823876, lng: -71.401490},
      {lat: 41.823996, lng: -71.401509},
      {lat: 41.824010, lng: -71.401345},
      {lat: 41.824210, lng: -71.401399},
      {lat: 41.824218, lng: -71.401082}
    ];

    var diman = [
      {lat: 41.824694, lng: -71.401719},
      {lat: 41.824707, lng: -71.401562},
      {lat: 41.824460, lng: -71.401525},
      {lat: 41.824485, lng: -71.401191},
      {lat: 41.824370, lng: -71.401178},
      {lat: 41.824334, lng: -71.401663}
    ];

    var harkness = [
      {lat: 41.824044, lng: -71.401092},
      {lat: 41.824109, lng: -71.400250},
      {lat: 41.823988, lng: -71.400234},
      {lat: 41.823922, lng: -71.401076}
    ];

    var marcy = [
      {lat: 41.824897, lng: -71.401558},
      {lat: 41.824910, lng: -71.401268},
      {lat: 41.824741, lng: -71.401221},
      {lat: 41.824745, lng: -71.400994},
      {lat: 41.824533, lng: -71.400971},
      {lat: 41.824522, lng: -71.401118},
      {lat: 41.824621, lng: -71.401132},
      {lat: 41.824611, lng: -71.401369},
      {lat: 41.824785, lng: -71.401390},
      {lat: 41.824777, lng: -71.401551}
    ];

    var barbour_hall_apts = [
      {lat: 41.823997, lng: -71.398345},
      {lat: 41.824026, lng: -71.397956},
      {lat: 41.823930, lng: -71.397936},
      {lat: 41.823910, lng: -71.398136},
      {lat: 41.823779, lng: -71.398117},
      {lat: 41.823806, lng: -71.397806},
      {lat: 41.823703, lng: -71.397782},
      {lat: 41.823666, lng: -71.398299}
    ];

    var barbour = [
      {lat: 41.824026, lng: -71.397956},
      {lat: 41.824045, lng: -71.397798},
      {lat: 41.823801, lng: -71.397762},
      {lat: 41.823798, lng: -71.397917}
    ];

    var perkins = [
      {lat: 41.823859, lng: -71.396354},
      {lat: 41.823887, lng: -71.396119},
      {lat: 41.823398, lng: -71.396010},
      {lat: 41.823369, lng: -71.396252}
    ];

    var caswell = [
      {lat: 41.826307, lng: -71.400766},
      {lat: 41.826319, lng: -71.400598},
      {lat: 41.825969, lng: -71.400552},
      {lat: 41.825953, lng: -71.400718}
    ];

    var thayer_315 = [
      {lat: 41.830759, lng: -71.400878},
      {lat: 41.830777, lng: -71.400617},
      {lat: 41.830494, lng: -71.400590},
      {lat: 41.830483, lng: -71.400848}
    ];

    var new_pembroke_1 = [
      {lat: 41.830547, lng: -71.401208},
      {lat: 41.830560, lng: -71.401052},
      {lat: 41.830335, lng: -71.401027},
      {lat: 41.830331, lng: -71.401170}
    ];

    var new_pembroke_2 = [
      {lat: 41.830525, lng: -71.401585},
      {lat: 41.830536, lng: -71.401465},
      {lat: 41.830501, lng: -71.401462},
      {lat: 41.830500, lng: -71.401422},
      {lat: 41.830427, lng: -71.401411},
      {lat: 41.830421, lng: -71.401453},
      {lat: 41.830386, lng: -71.401449},
      {lat: 41.830377, lng: -71.401569}
    ];

    var new_pembroke_3 = [
      {lat: 41.830659, lng: -71.401634},
      {lat: 41.830674, lng: -71.401398},
      {lat: 41.830699, lng: -71.401401},
      {lat: 41.830706, lng: -71.401284},
      {lat: 41.830685, lng: -71.401284},
      {lat: 41.830686, lng: -71.401243},
      {lat: 41.830601, lng: -71.401236},
      {lat: 41.830598, lng: -71.401289},
      {lat: 41.830548, lng: -71.401287},
      {lat: 41.830543, lng: -71.401387},
      {lat: 41.830576, lng: -71.401390},
      {lat: 41.830565, lng: -71.401631}
    ];

    var new_pembroke_4 = [
      {lat: 41.830331, lng: -71.401170},
      {lat: 41.830335, lng: -71.401027},
      {lat: 41.830128, lng: -71.401000},
      {lat: 41.830122, lng: -71.401135}
    ];

    var young_orchard_2 = [
      {lat: 41.824156, lng: -71.396957},
      {lat: 41.824153, lng: -71.396678},
      {lat: 41.823949, lng: -71.396679},
      {lat: 41.823949, lng: -71.396954}
    ];

    var young_orchard_4 = [
      {lat: 41.824200, lng: -71.396509},
      {lat: 41.824203, lng: -71.396233},
      {lat: 41.823998, lng: -71.396226},
      {lat: 41.823997, lng: -71.396497}
    ];

    var young_orchard_10 = [
      {lat: 41.824222, lng: -71.395880},
      {lat: 41.824224, lng: -71.395606},
      {lat: 41.824021, lng: -71.395603},
      {lat: 41.824017, lng: -71.395874}
    ];

    var gradcenter_a = [
      {lat: 41.823280, lng: -71.400934},
      {lat: 41.823088, lng: -71.400743},
      {lat: 41.822952, lng: -71.400993},
      {lat: 41.823135, lng: -71.401183}
    ];

    var gradcenter_b = [
      {lat: 41.823762, lng: -71.401106},
      {lat: 41.823662, lng: -71.400820},
      {lat: 41.823450, lng: -71.400963},
      {lat: 41.823544, lng: -71.401240}
    ];

    var gradcenter_c = [
      {lat: 41.823312, lng: -71.400395},
      {lat: 41.823214, lng: -71.400116},
      {lat: 41.822999, lng: -71.400244},
      {lat: 41.823095, lng: -71.400530}
    ];

    var gradcenter_d = [
      {lat: 41.823694, lng: -71.400630},
      {lat: 41.823830, lng: -71.400372},
      {lat: 41.823643, lng: -71.400192},
      {lat: 41.823504, lng: -71.400432}
    ];

    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
      paths: [barbour_hall_apts, barbour],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);

    // Bounds for North America
    var strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(41.823737, -71.404693),
      new google.maps.LatLng(41.832433, -71.395098)
    );

    // Listen for the drag and dragend event
    google.maps.event.addListener(map, 'drag', function() {
      keepInBounds();
    });

    google.maps.event.addListener(map, 'dragend', function() {
      keepInBounds();
    });

    function keepInBounds() {
      if (strictBounds.contains(map.getCenter())) return;

      // We're out of bounds - Move the map back within the bounds
      var c = map.getCenter(),
        x = c.lng(),
        y = c.lat(),
        maxX = strictBounds.getNorthEast().lng(),
        maxY = strictBounds.getNorthEast().lat(),
        minX = strictBounds.getSouthWest().lng(),
        minY = strictBounds.getSouthWest().lat();

      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;

      map.setCenter(new google.maps.LatLng(y, x));
    }
  }
  // initMap();
});
