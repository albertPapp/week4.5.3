import "./styles.css";

const text = document.getElementById("input-show");
const button = document.getElementById("submit-data");
const body = document.getElementById("body");
button.addEventListener("click", getShows);

async function getShows() {
  const url = "https://api.tvmaze.com/search/shows?q=" + text.value;
  const showPromise = await fetch(url);
  const showJson = await showPromise.json();
  console.log(showJson);

  if (showJson) {
    showJson.forEach((element) => {
      let mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "show-data");
      let img = document.createElement("img");
      if (element.show.image !== null && element.show.image.medium !== null) {
        img.setAttribute("src", element.show.image.medium);
      }
      let divShowInfo = document.createElement("div");
      divShowInfo.setAttribute("class", "show-info");
      let header = "";
      if (element.show !== null && element.show.name !== null) {
        header = "<h1>" + element.show.name + "</h1>";
      }
      let summary = "";
      if (element.show !== null && element.show.summary !== null) {
        summary = element.show.summary;
      }

      divShowInfo.innerHTML = header + summary;

      mainDiv.appendChild(img);
      mainDiv.appendChild(divShowInfo);
      body.appendChild(mainDiv);
    });
  }
}
