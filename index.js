const counter = document.querySelector(".view-number");
async function updateView() {
  let response = await fetch(
    "https://4w8w39wgm4.execute-api.us-east-1.amazonaws.com/cloudresume-getviews"
  );
  let data = await response.json();
  counter.innerHTML = ` Views: ${data}`;
}

updateView();
