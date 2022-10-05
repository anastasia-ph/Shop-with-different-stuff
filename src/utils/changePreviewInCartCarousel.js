
export function changePreviewInCartCarousel(e, gallery) {
    let parentClassName = e.target.parentNode.className.split(' ')[1]

    let currentImageSrc = document.querySelector(`.${parentClassName}`).previousElementSibling.src
    let indexCurrentImageSrc = gallery.indexOf(currentImageSrc)

    switch (e.target.alt) {
        case "carousel previous button":
            if (indexCurrentImageSrc === 0) {
                break;
            }
            document.querySelector(`.${parentClassName}`).previousElementSibling.src = gallery[indexCurrentImageSrc - 1]
            break;

        case "carousel next button":
            if (indexCurrentImageSrc === (gallery.length - 1)) {
                break;
            }
            document.querySelector(`.${parentClassName}`).previousElementSibling.src = gallery[indexCurrentImageSrc + 1]
            break
        default:
            console.log("Argument doesn't match cases")
    }

    this.setState({
        isChangePreview: false,
    })


}