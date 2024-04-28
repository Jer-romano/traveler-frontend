import React from "react";
import { render } from "@testing-library/react";
import TripList from "./TripList";

it("renders without crashing", function () {
    render(<TripList/>);
});

it("matches snapshot", function() {
    const { asFragment } = render(<TripList/>);
    expect(asFragment()).toMatchSnapshot();
});