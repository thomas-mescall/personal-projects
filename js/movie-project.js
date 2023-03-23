"use strict";

// // loading message to be replaced with movie info
let loading = alert("Page loading...");

// listener for loading listeners
document.addEventListener('DOMContentLoaded', function (){

// pulling data from glitch json file
    $.ajax({
        url: 'https://better-glowing-algebra.glitch.me/movies'
    }).done(function (data) {
        console.log(data);
        // empty string to contain movie info
        let movieList = "";
        let i;
        let count = 0;
        // for loop to create movie info for empty string
        for (i = 0; i < 5; i++) {
            let title = data[i].title;
            // let director = data[i].director;
            let rating = data[i].rating;
            let genre = data[i].genre;
            count++;
            // let id = data[i].id;
            // generating movie info for html
            if(genre === undefined){
                genre = "Family";
            }
                movieList += '<container>' +
                    '<div class="cards modal-body">' +
                    '<h3 class="fs-5">' + "Title: " + title + '</h3>' +
                    // '<p>' + director + '</p>' +
                    '<p>' + '<sub>' + "Rating: " + rating + '</sub>' + '</p>' +
                    '<p>' + '<sub>' + "Genre: " + genre + '</sub>' + '</p>' +
                    // '<p>' + id + '</p>' +
                    '</div>' +
                    '</container>';
        }
        $('.movies').html(movieList);
    })

    let movieRating = document.querySelector('.movieRating');
    let movieTitle = document.querySelector('.movieTitle');
    let buttonControlOne = document.querySelector('.btnOne');
    buttonControlOne.addEventListener('click', function (e){
        e.preventDefault();
        function addMovie() {
            let newMovie = {
                title: movieTitle.value,
                rating: movieRating.value
            };
            console.log(newMovie);
            return newMovie;
        }
// ajax POST request for user adding movie info
        $.ajax({
            type: "POST",
            url: 'https://better-glowing-algebra.glitch.me/movies/',
            data: addMovie()
        }).done(function () {
            // document.getElementsByClassName('.movies').innerHTML = addMovie();
        })
        console.log("is this working?");
        console.log(data);
    })

//allowing users to edit existing movies
//     Give users the option to edit an existing movie
//     A form should be pre-populated with the selected movie's details
//     Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.

// dropdown for selecting your movie to edit
    $.ajax({
        url: 'https://better-glowing-algebra.glitch.me/movies'
    }).done(function (data) {
        console.log(data);
        // empty string to contain movie info
        let movieList = "";
        let i;
        // for loop to create movie info for empty string
        for (i = 0; i < data.length; i++) {
            let title = data[i].title;
            let rating = data[i].rating;
            let id = data[i].id;
            // generating movie info for html
            movieList += '<div class="border border-danger cards">' +
                `<option value=${id}> <h3>` + "Title: " + title + ", " + '</h3>' +
                " " +
                '<p>' + '<sub>' + "Rating: " + '</sub>' + rating + '</p></option>' +
                // '<p>' + id +'</p>'+
                '</div>';
        }
        $('.movieSelection').html(movieList);
        $('.movieDeleteSelect').html(movieList);
        $('.movieFilterTitle').html(movieList);
    })

// user input for editing movie from selector
    let movieSelect = document.querySelector('.movieSelection');
    let movieEdit = document.querySelector('.editMovie');
    let movieEditTwo = document.querySelector('.editMovieTwo')
    let buttonControlTwo = document.querySelector('.btnTwo');

    buttonControlTwo.addEventListener('click', function (e){
        e.preventDefault();
        // calling data so that we may change it
        $.ajax({
            type: "PATCH",
            url: 'https://better-glowing-algebra.glitch.me/movies/'+movieSelect.value,
            data: {title: movieEdit.value,
                rating: movieEditTwo.value
            }
        })
    })

// ajax request for deleting a movie
    let movieDelete = document.querySelector('.movieDeleteSelect');
    let buttonControlThree = document.querySelector('.btnThree');
    buttonControlThree.addEventListener('click', function (e){
        e.preventDefault();
        $.ajax({
            type: "DELETE",
            url: 'https://better-glowing-algebra.glitch.me/movies/' +movieDelete.value
        });
    });

    // let buttonControlFour = document.querySelector('.btnFour');
    // let movieFilterTitle = document.querySelector('.movieFilterTitle');
    // buttonControlFour.addEventListener('click', function (e){
    //
    // })
    // function clickControl() {
    //     let spinControlOne = document.getElementById('.btnTwo');
    //     let spinner = document.querySelector('.spinner-border');
    //     spinControlOne.disabled = true;
    //     spinner.style.display = 'block';
    //     //possible ajax call
    //     spinner.style.display = 'none';
    //     spinControlOne.disabled = 'false';
    // }
    // document.getElementById('btnTwo').addEventListener('click', clickControl);

});




