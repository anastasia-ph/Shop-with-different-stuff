export const switchActivePreview = (e) => {
    const PREVIOUS_ACTIVE = document.getElementsByClassName("pdp__images-preview-container_active");
    PREVIOUS_ACTIVE[0].classList.remove("pdp__images-preview-container_active");
    e.currentTarget.classList.add("pdp__images-preview-container_active");
}