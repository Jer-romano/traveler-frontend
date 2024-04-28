import React from "react";
import { render } from "@testing-library/react";
import TripPreviewCard from "./TripPreviewCard";
import { MemoryRouter } from "react-router";

// it("renders without crashing", function () {
//     render(<TripPreviewCard/>);
// });

const img = {
    fileUrl: "../images/brazil_photo2.jpeg",
    tag1: "Cool",
    tag2: "Awesome",
    tag3: "Sky",
    tag4: "Cloud",
    tag5: "Building"
};


it("matches snapshot", function() {
    const { asFragment } = render(
    <MemoryRouter>
        <TripPreviewCard
        id={1}
        title={"The best trip"}
        tripImage={img}
        username={"testuser"}
        />
    </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});