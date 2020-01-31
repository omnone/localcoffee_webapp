/////////////////////////////////////////////////////////////////
//word slider
var quotes = [" Καφέ", " Τυρόπιτα", " Κέικ", "Espresso"];

var i = 1;

if (jQuery(window).innerWidth() > 600) {
  setInterval(function () {
    // $("#word-slide").html(quotes[i]).fadeIn("slow");
    $("#word-slide").css({
      display: "none"
    });
    $("#word-slide")
      .html(quotes[i])
      .fadeIn("slow");
    $("#word-slide")
      .delay(1000)
      .fadeOut("slow");

    if (i == quotes.length - 1) i = 0;
    else i++;
  }, 2000);
}

//hover animations
$(document).ready(function () {
  $("#social a i").hover(function () {
    $(this).addClass("animated").addClass("pulse").addClass("infinite");;
    $(this).css("color", "white");
  }, function () {
    $(this).removeClass("animated").removeClass("pulse");
    $(this).css("color", "#333");

  });

  $('input[type=text]').click(function () {
    $(this).removeAttr('placeholder');
  });

  $('input[type=email]').click(function () {
    $(this).removeAttr('placeholder');
  });

  $('input[type=password]').click(function () {
    $(this).removeAttr('placeholder');
  });


});

//input animations

//scroll reveal items on landing page
window.sr = ScrollReveal({
  reset: false
});
sr.reveal("#about", {
  duration: 2000,
  origin: "left"
});
sr.reveal("#about-panels", {
  duration: 2000,
  origin: "left"
});
// sr.reveal('#contact', { duration: 2000, origin: 'left' });
sr.reveal("#sign-in", {
  duration: 2000,
  origin: "left"
});

//smooth scroll
$("a[href*=#]:not([href=#])").click(function () {
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html,body").animate({
          scrollTop: target.offset().top
        },
        1000
      );
      return false;
    }
  }
});


//scrolling buttons top and cart
window.onload = function () { //for cart-btn
  scrollFunction()
};

window.onscroll = function () { //for top-btn
  topBtn()
};

//scripts for client mobile version
function scrollFunction() {

  var element = document.querySelector("#myBtn");
  $("#myBtn").css("display", "inline-block").addClass('animated fadeInDown');

}

function topBtn() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    var element = document.querySelector("#myBtn1");
    element.classList.remove("fadeOutUp");
    $("#myBtn1").css("display", "inline-block").addClass('animated fadeInDown');
  } else {
    var element = document.querySelector("#myBtn1");
    element.classList.remove("fadeInDown");
    $("#myBtn1").addClass('animated fadeOutUp');
  }

}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  $("#myBtn").css("display", "none");

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  $("#myBtn").css("display", "inline-block");

}


//close alert
$(".alert button.close").click(function (e) {
  $(this)
    .parent()
    .fadeOut("slow");
});


///Admin&Manager Scripts /////////////////////////////////////////////////////////////////
//add new manager
$(".add_manager").click(function () {
  var currentRow = $(this).closest("tr");
  var manager_id = currentRow.find("#selectManager").val();
  var shop_name = currentRow.find(".name").text();


  $.ajax({
    type: "POST",
    url: "/katastimata",
    async: true,
    datatype: "json",
    data: {
      "manager": manager_id,
      "katastima": shop_name.trim()
    },
    success: function (response) {
      //////console.log(response.success);
      window.location.reload(); //reload when you get success response from server
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });




});

//update apothema proiontos apo ton manager
$(".refresh-item").click(function () {
  var currentRow = $(this).closest("tr");
  var item_name = currentRow.find(".name").html();
  var item_quant = currentRow.find("#quantity").val();
  var katastima = document.getElementById("katastima").textContent;


  $.ajax({
    type: "POST",
    url: "/manage-items",
    async: true,
    datatype: "json",
    data: {
      "quantity": item_quant,
      "katastima": katastima.trim(),
      "item_name": item_name.trim()
    },
    success: function (response) {
      ////console.log(response.success);
      window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

});

//set quantity of an item to zero
$(".disable-item").click(function () {
  var currentRow = $(this).closest("tr");
  var item_name = currentRow.find(".name").html();
  var katastima = document.getElementById("katastima").textContent;


  $.ajax({
    type: "POST",
    url: "/manage-items",
    async: true,
    datatype: "json",
    data: {
      "quantity": 0,
      "katastima": katastima.trim(),
      "item_name": item_name.trim()
    },
    success: function (response) {
      ////console.log(response.success);
      window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

});

//admin disable items and alter price
$(".disable-adm-item").click(function () {
  var currentRow = $(this).closest("tr");
  var item_name = currentRow.find(".name").html();


  $.ajax({
    type: "POST",
    url: "/proionta",
    async: true,
    datatype: "json",
    data: {
      "item_name": item_name.trim()
    },
    success: function (response) {
      ////console.log(response.success);
      window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

});

$(".refresh-adm-item").click(function () {
  var currentRow = $(this).closest("tr");
  var price = currentRow.find("#price").val();
  var item_name = currentRow.find(".name").html();


  $.ajax({
    type: "POST",
    url: "/updprice",
    async: true,
    datatype: "json",
    data: {
      "item_name": item_name.trim(),
      "price": price
    },
    success: function (response) {
      ////console.log(response.success);
      window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

});

/////////////////////////////////////////////////////////////////////////////////////////////////
// cart scripts
//quantity btns

$(".plus").click(function () {
  var currentRow = $(this).closest("tr"); //get the clossest tr on .plus button

  if (parseInt(currentRow.find("#quantity").attr("max")) > parseInt(currentRow.find("#quantity").val()) || isNaN(parseInt(currentRow.find("#quantity").attr("max")))) {
    currentRow.find("#quantity").val(parseInt(currentRow.find("#quantity").val()) + 1); //ean i posotita einai diathesimi
  } else {
    //show error window for quantity
    alertify.defaults.transition = "pulse";
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";

    alertify.alert('Μη Διαθέσιμη Ποσότητα', currentRow.find(".name").html() + ": " + parseInt(currentRow.find("#quantity").attr("max")) + " διαθέσιμες/α!", function () {});
  }

});

$(".minus").click(function () {
  var currentRow = $(this).closest("tr");

  if (parseInt(currentRow.find("#quantity").val()) > 1) {
    currentRow.find("#quantity").val(parseInt(currentRow.find("#quantity").val()) - 1);
    // alert("click");
  }

  currentRow.find("#no-quant").removeClass('animated bounceInDown');
  currentRow.find("#no-quant").addClass('animated bounceOutDown');



});


//add item to cart
var total = 0;
var order = []; //order items

$(".add_cart").click(function () {
  var currentRow = $(this).closest("tr");
  var item_name = currentRow.find(".name").html();
  var item_quant = currentRow.find("#quantity").val();
  var item_price = currentRow.find("#price").html();
  //////console.log(item_price);

  total = total + Number((parseFloat(item_price, 10) * parseInt(item_quant)).toFixed(2));
  total = Number(total.toFixed(2));

  //info panel about client's order items & quantity
  $("#order-info ol").append(
    "<li class='animated slideInLeft'>" +
    item_name +
    "  x" +
    item_quant + "     = " + Number((parseFloat(item_price, 10) * parseInt(item_quant)).toFixed(2)) + " &euro;" +
    "<span class='pull-right' id='sp-icon'><i class='fa fa-trash-o' aria-hidden='true'></i></span>" +
    "</li>"
  );

  $("#myBtn span").html(parseInt($("#myBtn span").text()) + parseInt(item_quant));



  $("#order-total").html(total); //show total to user


  if ($('li:contains("' + item_name + '")').length <= 1) {
    //ean den iparxei mesa sto order to item valto
    order.push({
      name: item_name.trim(),
      quantity: item_quant,
      price: item_price
    });

  } else {
    // ean iparxei to item sto order vres tin thesi tou kai ananeose tin posotita
    index = order.findIndex(x => x.name == item_name.trim());
    order[index].quantity = parseInt(order[index].quantity, 10) + parseInt(item_quant, 10);

    // index = order.findIndex(x => x.name == item_name.trim());

    //ean kanaprostethei to idio item ananewse to info window
    $('li:contains("' + item_name + '")').remove();

    $("#order-info ol").append(
      "<li class='animated slideInLeft'>" +
      item_name +
      "  x" +
      order[index].quantity + "     = " + Number((parseFloat(item_price, 10) * parseInt(order[index].quantity)).toFixed(2)) + " &euro;" +
      "<span class='pull-right' id='sp-icon'><i class='fa fa-trash-o' aria-hidden='true'></i></span>" +
      "</li>"
    );

  }

  //console.log(order);
});


//Click on X to delete order item
$("ol").on("click", "span", function (event) {

  var delete_item = $(this)
    .parent()
    .clone() //clone the element
    .children() //select all the children
    .remove() //remove all the children
    .end() //again go back to selected element
    .text()
    .trim();


  console.log(delete_item.substring(0, delete_item.indexOf('x')).trim());
  delete_item = delete_item.substring(0, delete_item.indexOf('x')).trim();
  //find removed item
  var item = jQuery.grep(
    order,
    function (n, i) {
      return n.name == delete_item;
    },
    false
  );

  var result = jQuery.grep(
    order,
    function (n, i) {
      return n.name != delete_item;
    },
    false
  );

  //delete from order
  order = result.slice();
  // ////console.log(order);
  $('li:contains("' + item[0].name + '")').hide('slow', function () {
    $(this).remove();
  });

  console.log(order);
  $("#myBtn span").html(parseInt($("#myBtn span").text()) - parseInt(item[0].quantity, 10));


  total = parseFloat(total) - Number((parseFloat(item[0].price, 10) * parseInt(item[0].quantity, 10)).toFixed(2));
  total = Number(total.toFixed(2));
  // ////console.log(total
  if ($('li').length == 0) {
    total = 0;
  };

  //console.log(total);

  $("#order-total").html(total);

  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
  event.stopPropagation();
});

//follow panel
// $(window).scroll(function() {
//   $("#order-info").css("top", $(this).scrollTop());
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////
//google maps
var map = null;
var marker = null;
var geocoder;
var ok = true;

//init google map
function initMap() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var myLatLng = { //dixne sto map tin perioxi tis peloponisou arxika
    lat: 38.246639,
    lng: 21.734573
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(myLatLng),
    zoom: 8,
  });

  directionsDisplay.setMap(map);


  // alert("initMap");
  geocoder = new google.maps.Geocoder();

  if ($('#order-btn').length) {
    document.getElementById('order-btn').addEventListener('click', function () {
      geocodeAddress(geocoder, map);

    });
  } else if ($('#delivery_btn').length) {
    document.getElementById('delivery_btn').addEventListener('click', function () {
      ////console.log("btn");
      geocodeAddress(geocoder, map);

    });
  } else if ($('#direction-btn').length) { //ama iparxei direction-btn ise se selida delivery
    document.getElementById('direction-btn').addEventListener('click', function () {
      //console.log("btn dir");
      calculateAndDisplayRoute(directionsService, directionsDisplay, true);
    });

    calculateAndDisplayRoute(directionsService, directionsDisplay, false);
  } else if ($('#reload-btn').length) { //delivery refresh orders
    document.getElementById('reload-btn').addEventListener('click', function () {
      location.reload();

    });


  }

  ////console.log("init");

  initAutocomplete();
};

var infowindow;
var latlng;
var address;
var deliv;
var apostasi;

function calculateAndDisplayRoute(directionsService, directionsDisplay, show_dir) {

  //thesi delivery

  var delivlat = $('#deliv-lat').text().trim();
  var delivlng = $('#deliv-lng').text().trim();

  //console.log(delivlat);


  var currPosition = new google.maps.LatLng(delivlat, delivlng);

  directionsService.route({
    origin: currPosition,
    destination: $('#address').text().trim(),
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      //console.log(parseFloat(response.routes[0].legs[0].duration.value).toFixed(2) / 60 + " minutes");
      //console.log(response.routes[0].legs[0].distance.value + " meters");
      if (show_dir == true) {
        directionsDisplay.setDirections(response);
      }

      if (ok == true) {
        //console.log(ok);
        $("#ok ul").append('<li><strong>Συνολική Απόσταση: </strong>' + parseFloat(response.routes[0].legs[0].distance.value).toFixed(2) / 1000 + ' χιλιόμετρα</li>');
        $("#ok ul").append('<li><strong>Μέσος Χρόνος Παράδοσης: </strong>' + parseFloat(response.routes[0].legs[0].duration.value).toFixed(2) / 60 + ' λεπτά</li>');
        ok = false;
      }

      apostasi = parseFloat(response.routes[0].legs[0].distance.value).toFixed(2) / 1000;
      //console.log(apostasi);

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



function geocodeAddress(geocoder, resultsMap) {
  //console.log("geocode");
  var end = new google.maps.LatLng('41.850033', '-87.6500523');

  if ($('#autocomplete').length) {
    var address = document.getElementById('autocomplete').value;
  } else {
    address = $('#address').text();
    //console.log(address);

  }

  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      if (marker !== null) {
        marker.setMap(null);
      }
      marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        draggable: true,
        animation: google.maps.Animation.DROP

      });
      resultsMap.setZoom(17);
      infowindow = new google.maps.InfoWindow;

      //latlong of addr
      latlng = marker.getPosition();

      marker.addListener('dragend', function () {
        latlng = marker.getPosition();
        geocodeLatLng(geocoder, map, latlng);

      });
    } else {
      //console.log('Geocode was not successful for the following reason: ' + status);
    }
  });

}


var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  // administrative_area_level_1: 'short_name',
  // country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {

  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete')), {
      types: ['geocode'],
      componentRestrictions: {
        country: "gr"
      }
    });


  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    if ($('#' + component).length) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
  }


  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

function geocodeLatLng(geocoder, map, latlng) {

  var latlng = {
    lat: latlng.lat(),
    lng: latlng.lng()
  };
  geocoder.geocode({
    'location': latlng
  }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {

        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
        $('#order-addr').val(results[0].formatted_address);
        $('#autocomplete').val(results[0].formatted_address);


        for (var i = 0; i < results[0].address_components.length; i++) {
          var addressType = results[0].address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = results[0].address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }

      } else {
        ////console.log('No results found');
      }
    } else {
      ////console.log('Geocoder failed due to: ' + status);
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////


//for modal scripts

$("#myModal").on("shown.bs.modal", function () {
  google.maps.event.trigger(map, "resize");
  $('#order-addr').val($('#autocomplete').val());

  map.setCenter(marker.getPosition());
});



//address entered from user
function form_submit() {

  var lat = latlng.lat();
  var lng = latlng.lng();
  var addr = $('#order-addr').val();

  $.ajax({
    type: "POST",
    url: "/",
    async: true,
    datatype: "json",
    data: {
      "lat": lat,
      "lng": lng,
      "addr": addr
    },
    success: function (response) {
      window.location.href = response.redirect;
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

  // document.getElementById("post-addr").submit();
}

$("#finish-order").click(function () {
  ////console.log("order:" + order[0].name);


  $.ajax({
    type: "POST",
    url: "/order",
    async: true,
    datatype: "json",
    data: {
      "order": order
    },
    success: function (response) {
      window.location.href = response.redirect;

    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

});

//delivery guy

$("#katastasi-toggle").click(function () {

  //switch animation
  if ($("#switch").hasClass("fa fa-toggle-off fa-2x pull-right")) {
    $("#switch").removeClass("fa fa-toggle-off fa-2x pull-right").addClass("fa fa-toggle-on fa-2x pull-right");
    $("#kat_deliv").text('Ενεργός');
  } else {
    $("#switch").removeClass("fa fa-toggle-on fa-2x pull-right").addClass("fa fa-toggle-off fa-2x pull-right");
    $("#kat_deliv").text('Ανενεργός');

  }

  var status = $('#kat_deliv').text();

  if (status == 'Ενεργός') {
    status = 'on';
  } else {
    status = 'off';
  }

  $.ajax({
    type: "POST",
    url: "/vardia",
    async: true,
    datatype: "json",
    data: {
      "status": status
    },
    success: function (response) {
      //window.location.href = response.redirect;
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });



});

function ksekina_vardia() {
  var lat = latlng.lat();
  var lng = latlng.lng();
  var status = $('#kat_deliv').text();

  if (status == 'Ενεργός') {
    status = 'on';
  } else {
    status = 'off';
  }

  //console.log(lat + " " + lng + " " + status);
  $.ajax({
    type: "POST",
    url: "/deliv",
    async: true,
    datatype: "json",
    data: {
      "lat": lat,
      "lng": lng,
      "status": status
    },
    success: function (response) {
      window.location.href = response.redirect;
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

  // document.getElementById("post-addr").submit();
}


function finish_order() {
  var date = $('#date').text();


  $.ajax({
    type: "POST",
    url: "/order_complete",
    async: true,
    datatype: "json",
    data: {
      apostasi: apostasi,
      date: date
    },
    success: function (response) {
      window.location.href = response.redirect;
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });

  // document.getElementById("post-addr").submit();
}

$(document).ready(function () {
  initMap();
  geocodeAddress(geocoder, map);

});


///////////////////////////////////////////////////////////////////////////////////////////////////////