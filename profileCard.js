function generateProfileCard() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    const profilePicture = document.getElementById("profilePicture").files[0];
    if (profilePicture) {
        uploadProfilePicture(profilePicture).then((url) => {
            saveProfileData(name, email, bio, url);
        });
    } else {
        saveProfileData(name, email, bio, null);
    }
}

function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append("file", file);
    return fetch("/api/uploadProfilePicture", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => data.url);
}

function saveProfileData(name, email, bio, profilePictureURL) {
    fetch("/api/saveProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, bio, profilePictureURL }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Profile saved successfully!");
            window.location.href = `/profile/${data.profileId}`;
        });
}
