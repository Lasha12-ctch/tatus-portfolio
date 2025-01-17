// Load videos from server
fetch("/api/videos")
    .then((response) => response.json())
    .then((videos) => {
        const gallery = document.getElementById("videoGallery");
        videos.forEach((video) => {
            const item = document.createElement("div");
            item.className = "video-item";
            item.innerHTML = `
                <video controls width="100%">
                    <source src="/uploads/${video.filename}" type="video/mp4">
                </video>
                <h3>${video.title}</h3>
            `;
            gallery.appendChild(item);
        });
    });

// Handle video upload
document.getElementById("uploadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", document.getElementById("videoFile").files[0]);
    formData.append("title", document.getElementById("videoTitle").value);

    fetch("/api/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            location.reload();
        });
});
