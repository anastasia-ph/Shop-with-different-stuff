export function switchCategory(e) {
    //change the "selected" state
    const previousActive = document.getElementsByClassName("selected");
    previousActive[0].classList.remove("selected");
    e.target.classList.add("selected");

    localStorage.setItem("currentCategory", e.target.innerHTML);
    this.setState({ currentCategory: e.target.innerHTML })


};
