import React from "react";
import { render } from "@testing-library/react";
import HotelCard from "./HotelCard";
//TODO Add more tests!!

it("renders without crashing", function () {
    render(<HotelCard/>);
});

it("matches snapshot", function() {
    const { asFragment } = render(<HotelCard/>);
    expect(asFragment()).toMatchSnapshot();
});