function loginWithGoogle() {
    // Google Login Logic
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            checkUserProfile(user); // Check if the user has an existing profile
        })
        .catch((error) => {
            console.error("Google Login Failed:", error.message);
        });
}

function checkUserProfile(user) {
    fetch(`/api/checkProfile?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.exists) {
                window.location.href = `/profile/${data.profileId}`;
            } else {
                window.location.href = "profileForm.html";
            }
        })
        .catch((error) => {
            console.error("Error Checking Profile:", error.message);
        });
}
