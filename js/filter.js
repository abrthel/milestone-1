/**
 * From the given node, walk up the parent chain until a node
 * name matches the parent tag.
 *
 * @param  {HTMLElement} node - Node to start looking from.
 * @param  {string} parentTag - Parent node tag name.
 * @retruns {HTMLElement} - The expected parent node otherwise null
 */
function parentsUntil(node, parentTag) {
  let parentNode = node;
  do
  {
    parentNode = parentNode.parentElement;
  } while(parentNode && parentNode.tagName != parentTag.toUpperCase())

  return parentNode;
}

function filterSkills(event) {
  const buttons = document.querySelectorAll(".skillButtonGroup button");
  const skills = document.querySelectorAll(".skillCards > li");
  const currentCategory = event.target.dataset.category;

  // Clear active state
  for(const button of buttons) {
    button.classList.remove("active");
  }

  // Add active state to current button
  event.target.classList.add("active");

  // Filter
  for(const skill of skills) {
    if(currentCategory === "all" || skill.dataset.category === currentCategory) {
      skill.classList.remove("hidden");
    } else {
      skill.classList.add("hidden");
    }
  }
}

document
  .querySelector("#allBtn")
  .addEventListener("click", filterSkills);

document
  .querySelector("#filterLangBtn")
  .addEventListener("click", filterSkills);

document
  .querySelector("#filterFrameworkBtn")
  .addEventListener("click", filterSkills);

document
  .querySelector("#filterToolsBtn")
  .addEventListener("click", filterSkills);
