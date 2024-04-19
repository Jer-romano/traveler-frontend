import React from "react";
import { render } from "@testing-library/react";
import ImageCard from "./ImageCard";

it("renders without crashing", function() {
    const path = "../images/brazil_photo2.jpeg"
    render(<ImageCard
                image={path}
                caption={"hello"}
                tag1={"good"}
                tag2={"bad"}
                tag3={"ugly"}/>);
});

it("matches snapshot", function() {
    const path = "../images/brazil_photo2.jpeg"
    const { asFragment } = render(
        <ImageCard
            image={path}
            caption={"hello"}
            tag1={"good"}
            tag2={"bad"}
            tag3={"ugly"}/>
    );
    expect(asFragment()).toMatchSnapshot();
})
