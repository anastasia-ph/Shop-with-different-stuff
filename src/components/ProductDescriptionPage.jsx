import React from "react";
import { Query } from "@apollo/client/react/components"
import { GET_ATTRIBUTES_BY_ID } from "../GRAPHQL/Queries";
import { switchActivePreview } from "../utils/switchActivePreview";
import { AddToCartButton } from "./AddToCartButton"

export class PDP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentlyDisplayedName: "name",
            currentlyDisplayedPhoto: "photo"
        }
    }
    switchCurrentPreview = (e) => {
        this.setState({ currentlyDisplayedName: e.target.alt })
        this.setState({ currentlyDisplayedPhoto: e.target.src })
        switchActivePreview(e)
    }

    render() {
        return (

            <div className="pdp__container">

                <Query query={GET_ATTRIBUTES_BY_ID} variables={{ "id": this.props.id }}>
                    {({ data, error, loading }) => {
                        if (error) return <p>Error!</p>
                        if (loading) return <p>Loading...</p>
                        return (
                            <>
                                <div className="pdp__side-images-container">
                                    {data.product.gallery.map((e, i) =>
                                        <div className={i == 0 ? "pdp__images-preview-container pdp__images-preview-container_active" : "pdp__images-preview-container"} onClick={this.switchCurrentPreview.bind(this)}>
                                            <img className={data.product.name == "Jacket" ? "pdp__images-preview-jacket" : "pdp__images-preview"} src={e} alt={data.product.name} onLoad={() => this.setState({ currentlyDisplayedPhoto: data.product.gallery[0], currentlyDisplayedName: data.product.name })} />
                                        </div>)}
                                </div>
                                <div className={this.state.currentlyDisplayedName == "Jacket" ? "pdp__main-photo_container_jacket " : "pdp__main-photo_container"}>
                                    <img className={this.state.currentlyDisplayedName == "Jacket" ? "pdp__main-photo_jacket" : "pdp__main-photo"} src={this.state.currentlyDisplayedPhoto}></img>
                                </div>
                                <div className="pdp__item-description">
                                    <p className="pdp__item-brand">{data.product.brand}</p>
                                    <p className="pdp_item-name">{data.product.name}</p>
                                    <div className="attributes">
                                        {/* create html element for each attribute group name */}
                                        {data.product.attributes.map((e) => <div className="item-atribute__name">
                                            <p>{e.name}</p>
                                            {/* and create separate html elements for each value in attributes group */}
                                            {e.items.map((item) =>
                                                <p>{e.type == "text" && item.value}</p>)}
                                        </div>)}
                                    </div>
                                    <AddToCartButton text='Add to cart'></AddToCartButton>

                                    <div dangerouslySetInnerHTML={{ __html: data.product.description }} />

                                </div>


                            </>
                        )
                    }}
                </Query>
                {/* separate containers for Jacket items */}

            </div >
        )
    }
}