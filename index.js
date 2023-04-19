import { suggestionApi } from "./constants.js";
import { getApi, debounce } from "./util.js";

const suggestionContainer = document.getElementById("suggestionContainer");
const input = document.getElementById("input");
let suggestions = [];

const renderHtml = () => {
  suggestions.map(({ value }, index) => {
    const suggestionDivId = `suggestion${index}`;
    let suggestionDiv = document.getElementById(suggestionDivId);
    if (!suggestionDiv) {
      suggestionDiv = document.createElement("div");
      updateNode(suggestionDiv, suggestionDivId, "suggestion", value);
      suggestionContainer.appendChild(suggestionDiv);
    } else {
      updateNode(suggestionDiv, suggestionDivId, "suggestion", value);
    }
  });
  const suggestionContainerChildren = suggestionContainer.children;
  let i = suggestionContainerChildren.length - 1;
  while (i > suggestions.length - 1) {
    suggestionContainerChildren[i].innerText = "";
    suggestionContainerChildren[i].setAttribute("hidden", true);
    i--;
  }
};

const updateNode = (node, id, className, value) => {
  node.innerText = value;
  node.setAttribute("id", id);
  node.removeAttribute("hidden");
  node.classList.add(className);
};

const fetchSuggestions = async (e) => {
  const value = e.target.value;
  if (!value) {
    suggestions = [];
  } else {
    const url = `${suggestionApi}?term=${value}`;
    const response = await getApi(url);
    suggestions = response?.suggestions || [];
  }
  renderHtml();
};

const closeSuggestions = () => {
  suggestions = [];
  suggestionContainer.setAttribute("hidden", true);
};

const showSuggestions = () => {
  suggestionContainer.removeAttribute("hidden");
};

input.addEventListener("input", debounce(fetchSuggestions));
input.addEventListener("blur", closeSuggestions);
input.addEventListener("focus", showSuggestions);
