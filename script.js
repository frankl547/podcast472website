document.addEventListener("DOMContentLoaded", function() {
    const rssUrl = "https://anchor.fm/s/2253a8a0/podcast/rss"; // Replace with your Anchor RSS URL

    fetch(rssUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const episodes = data.querySelectorAll("item");
            const episodeContainer = document.getElementById("episode-container");

            episodes.forEach(episode => {
                const title = episode.querySelector("title").textContent;
                const audioUrl = episode.querySelector("enclosure").getAttribute("url");

                const episodeDiv = document.createElement("div");
                episodeDiv.classList.add("episode");

                const episodeTitle = document.createElement("h3");
                episodeTitle.textContent = title;
                episodeDiv.appendChild(episodeTitle);

                const audioElement = document.createElement("audio");
                audioElement.controls = true;

                const audioSource = document.createElement("source");
                audioSource.src = audioUrl;
                audioSource.type = "audio/mpeg";
                audioElement.appendChild(audioSource);
                episodeDiv.appendChild(audioElement);

                episodeContainer.appendChild(episodeDiv);
            });
        })
        .catch(err => {
            console.error("Error fetching RSS feed:", err);
        });
});
