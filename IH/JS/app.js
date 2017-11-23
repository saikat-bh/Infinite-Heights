var snapshot_data = null;

$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyCi5I9KSwpaZ966FuYEjU7JKv2NKQNCoP0",
        authDomain: "webjavascript-a5b0e.firebaseapp.com",
        databaseURL: "https://webjavascript-a5b0e.firebaseio.com",
        projectId: "webjavascript-a5b0e",
        storageBucket: "webjavascript-a5b0e.appspot.com",
        messagingSenderId: "198369032403"
  };
  firebase.initializeApp(config);
    var provider = new firebase.auth.GoogleAuthProvider();
    $("#sign_in").on("click", function(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
            console.log(user);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    });
    
    $("#but_save").on("click", function(){
        var name = $("#name").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        //console.log(name + " " + age + " " + gender);
        var customer_data = {
            __type__: "customer_details",
            __created_date: Date.now(),
            name: name,
            age: age,
            gender: gender
        };
        var userId = "USR_"+Date.now();
        firebase.database().ref('users/' + userId).set(customer_data);
    });
    
    $("#but_stud_save").on("click", function(){
        var name = $("#s_name").val();
        var cl = $("#s_class").val();
        var section = $("#s_section").val();
        //console.log(name + " " + age + " " + gender);
        var customer_data = {
            __type__: "student_details",
            __created_date: Date.now(),
            name: name,
            class: cl,
            section: section
        };
        var userId = "STUD_"+Date.now();
        firebase.database().ref('users/' + userId).set(customer_data);
    });
    
    $("#but_clear").on("click", function(){
        $("#search_box").empty();
    });
    
    $("#search_box").on("click", ".search_elements", function(){
        var user = $(this).attr("user");
        if(snapshot_data[user].__type__ === "customer_details"){
            //alert("Age: " + snapshot_data[user].age + " | Gender: "+ snapshot_data[user].gender);
            $("#name").val(snapshot_data[user].name);
        }
        if(snapshot_data[user].__type__ === "student_details"){
            //alert("Class: " + snapshot_data[user].class + " | Section: "+ snapshot_data[user].section);
            $("#s_name").val(snapshot_data[user].name);
        }
    });
    
    $("#but_search").on("click", function(){
        //alert("ok");
        var type = $("#search_options").val();
        var markup = "";
        for(var user in snapshot_data){
            
            if(snapshot_data[user].__type__ === type){
                //console.log(user);
                markup += '<p class="search_elements" user="'+user+'">'+snapshot_data[user].name+'</p>'
            }
        }
        $("#search_box").empty().html(markup);
    });
    
    retrive_types();
});



var retrive_types = function(){
    var ref = firebase.database().ref('users');
    var types_arr = [];
    ref.on("value", function(snapshot) {
    //console.log(JSON.stringify(snapshot));
    snapshot_data = snapshot.val();
    for(var user in snapshot_data){
        //console.log(user);
        var this_type = snapshot_data[user].__type__;
        //console.log(this_type);
        if(types_arr.indexOf(this_type) < 0)
            types_arr.push(this_type);
    }
    $('#search_options').empty();
    for(var i = 0; i < types_arr.length; i++){
        var this_type = types_arr[i];
        $('#search_options').append($('<option>', {value:this_type, text:this_type.replace("_", " ").toUpperCase()}));
    }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
};