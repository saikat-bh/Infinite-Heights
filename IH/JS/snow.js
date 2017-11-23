/*jquery file */
$(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5wyTGdmKnPDwdouleWSmLWIAM6XAcNoc",
    authDomain: "infinite-heights.firebaseapp.com",
    databaseURL: "https://infinite-heights.firebaseio.com",
    projectId: "infinite-heights",
    storageBucket: "infinite-heights.appspot.com",
    messagingSenderId: "1058612219797"
  };
	
$("#Register").on("click", function(){
		var gender = $("#Gender").val();
        var name = $("#Full name").val();
        var age = $("#Age").val();
		var email= $("#Email").val();
		var phone = $("#Phone Number").val();
		var permissions = $("#Permissions").val();
		var uname = $("#username").val();
		var pwd = $("#Password").val();
		var cpwd = $("#CPassword").val();
		var role = $("#Role").val();
		var comment = $("#message").val();
        
        //console.log(name + " " + age + " " + gender);
        var Members_data = {
            __type__: "Personal_details"
					{
						__created_date: Date.now(),
						gender: gender,
						name: name,
						age: age
					},
			__type__:"Contact Details"
					{
						email: email,
						phone: phone
					},
			__type__:"Account details"
					{
						permissions: permissions,
						uname: uname,
						pwd: pwd,
						cpwd: cpwd,
						role: role,
						comment: comment
					}
			
        };
var userId = "USR_"+Date.now();
        firebase.database().ref('users/' + userId).set(Members_data);
    });