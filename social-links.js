// Add the store profile URLs below. Contact and footer icons activate automatically.
const SOCIAL_PROFILE_URLS = {
  facebook: "",
  instagram: "",
  tiktok: ""
};

document.querySelectorAll("[data-social]").forEach((link) => {
  const url = SOCIAL_PROFILE_URLS[link.dataset.social]?.trim();
  if (!url) {
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
    return;
  }
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.removeAttribute("aria-disabled");
});
