import React from "react";
import { render } from "@testing-library/react";
import HotelForm from "./HotelForm";
//TODO Add more tests!!

it("renders without crashing", function () {
    render(<HotelForm/>);
});

it("matches snapshot", function() {
    const { asFragment } = render(<HotelForm/>);
    expect(asFragment()).toMatchSnapshot();
});