'use strict';

// getting the document ready
$(document).ready(function() {

// declaring variables

let apiKey = "s8GmsINAyxU3UDXsIYQAw8rL4e32f9BJ";
let topics = ["Water Skiing", "Snowboarding", "Running", "Weight Lifting", "Surfing"];
let buttonVal;

// dynamically create buttons with a class and IDs. Button names come from the topics array.

let buttonFunc = function() {
    for(let i=0; i<topics.length; i++) {
        $("#buttonRow").append(` <button class="dynamicButton" id="button${[i]}" value="${topics[i]}">${topics[i]}</button>`);
    }
}

// execute the button function

buttonFunc();

// when one of the buttons is clicked execute the AJAX call below

$(".dynamicButton").on("click", function() {
    buttonVal = $(this).val();
    let ajaxUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + buttonVal + "&limit=10";

    $.ajax({
        url: ajaxUrl,
        method: "GET",
    }).then(function(response){
        console.log(response.data[5].images.fixed_height_still.url);
        $("#imageCol").append(`<img src="${response.data[0].images.fixed_height_small_still.url}">`);
        
    })

});

});


