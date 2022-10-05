export function switchCategory(e) {
    //change the "selected" state
    const PREVIOUS_ACTIVE = document.getElementsByClassName("selected");
    PREVIOUS_ACTIVE[0].classList.remove("selected");
    e.target.classList.add("selected");

    localStorage.setItem("currentCategory", e.target.innerHTML);
    this.props.sendCategory(e.target.id)
    this.setState({ currentCategory: e.target.innerHTML })


};
