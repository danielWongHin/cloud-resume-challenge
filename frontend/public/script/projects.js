async function renderProjects() {
  const container = document.getElementById("projects-list");

   // Load your JSON file
  const response = await fetch("/data/projectsData.json");
  const projects = await response.json();
  console.log(projects)

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="row align-items-center">

        <!-- LEFT SIDE — TEXT -->
        <div class="col-12 col-md-7">
          <div class="project-title">${project.title}</div>
          <p class="project-description">${project.description}</p>
        <!-- Conditional Rendering -->
          ${
            project.links.repo
              ? `
            <div class="project-links">
              <a href="${project.links.repo}" target="_blank">GitHub Repo</a>
            </div>
          `
              : ""
          }
        </div>

        <!-- RIGHT SIDE — IMAGE -->
        <div class="col-12 col-md-5 text-center">
          <img src="${project.image}" class="project-image" alt="Project image">
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderProjects);
