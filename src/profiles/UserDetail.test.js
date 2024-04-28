import React from "react";
import { render } from "@testing-library/react";
import UserDetail from "./UserDetail";
//import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
    render(<UserDetail/>);
});

it("matches snapshot", function() {
    const { asFragment } = render(<UserDetail/>);
    expect(asFragment()).toMatchSnapshot();
});

