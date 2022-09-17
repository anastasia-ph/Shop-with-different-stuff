export const switchActivePreview = (e) => {
    const previousActive = document.getElementsByClassName("pdp__images-preview-container_active");
    previousActive[0].classList.remove("pdp__images-preview-container_active");
    e.currentTarget.classList.add("pdp__images-preview-container_active");
}