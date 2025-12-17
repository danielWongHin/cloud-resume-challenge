async function renderblogs() {
  const container = document.getElementById("blogs-list");

   // Load your JSON file
  const response = await fetch("/data/blogsData.json");
  const blogs = await response.json();
  console.log(blogs)

  blogs.forEach((blog) => {
    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <div class="row align-items-center">

        <!-- LEFT SIDE — TEXT -->
        <div class="col-12 col-md-7">
          <div class="blog-title">${blog.title}</div>
          <p class="blog-description">${blog.description}</p>
        <!-- Conditional Rendering -->
          ${
            blog.links.repo
              ? `
            <div class="blog-links">
              <a href="${blog.links.repo}" target="_blank">GitHub Repo</a>
            </div>
          `
              : ""
          }
        </div>

        <!-- RIGHT SIDE — IMAGE -->
        <div class="col-12 col-md-5 text-center">
          <img src="${blog.image}" class="blog-image" alt="blog image">
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderblogs);
