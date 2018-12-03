'use strict';

// Get the document ready.
$(document).ready(function() {

// Declare initial variables.
let apiKey = "s8GmsINAyxU3UDXsIYQAw8rL4e32f9BJ";
let topics = ["Water Skiing", "Snowboarding", "Running", "Weight Lifting", "Surfing"];
let buttonVal;
let rating; 

// Dynamically create buttons with a class and IDs. Button names come from the topics array.
let buttonFunc = function() {
    $(".dynamicButton").remove();
    for(let i=0; i<topics.length; i++) {
        $("#buttonRow").append(` <button class="dynamicButton" id="button${[i]}" value="${topics[i]}">${topics[i]}</button>`);
    };
};

// After entering text in the form text box and clicking Submit update the array and the sports buttons.
$("#submitButton").on("click", function() {
    let textInputVal = $("#textInput").val();
    topics.push(textInputVal);
    buttonFunc();
})

// Execute the button function
buttonFunc();

// When one of the non-submit buttons is clicked remove any current divs&images and ratings and then perform the ajax call and reload the DOM.
$(document).on("click", ".dynamicButton", function() {
   $(".giphy-Imgs").remove();
   $(".divImg").remove();
   $(".rateClass").remove();
    buttonVal = $(this).val();
    let ajaxUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + buttonVal + "&limit=10";

// Ajax call and associated function below
    $.ajax({
        url: ajaxUrl,
        method: "GET",    
    }).then(function(response){
        for(let i=0; i<10; i++) {
            rating = response.data[i].rating;
            $("#imageCol").append(`<div class="col-sm-4 divImg"><img src="${response.data[i].images.fixed_height_still.url}" width="150" height="150" no-motion="${response.data[i].images.fixed_height_still.url}" motion="${response.data[i].images.fixed_height.url}" gif-status="no-motion" class="giphy-Imgs"><span class="rateClass">Rating: ${rating}</span></div>`);

        };   
    });
});

// Click an image to make it animate or stop it from animating.
$(document).on("click", ".giphy-Imgs", function() {
    let gifState = $(this).attr("gif-status");
    if(gifState === "no-motion"){
        $(this).attr({"src": $(this).attr("motion"), "gif-status": "motion"});
    } else {
        $(this).attr({"src": $(this).attr("no-motion"), "gif-status": "no-motion"});
    };

});

});