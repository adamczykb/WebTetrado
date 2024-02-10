import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React, { useState } from "react";
import { Menu } from "../components/layout/common/Menu";
 
// describe("Test Layout.tsx", () => { 
//   afterEach(cleanup);
//   beforeEach(() => {
//     act(() => {
//       Object.defineProperty(window, "matchMedia", {
//         writable: true,
//         value: jest.fn().mockImplementation((query) => ({
//           matches: false,
//           media: query,
//           onchange: null,
//           addListener: jest.fn(), // deprecated
//           removeListener: jest.fn(), // deprecated
//           addEventListener: jest.fn(),
//           removeEventListener: jest.fn(),
//           dispatchEvent: jest.fn(),
//         })),
//       });
//     });
//   });
//   test("Test default Menu render", () => {
//     const { result } = renderHook(() => React.useState<Boolean>(false));
//     act(() => {
//       render(
//         <Menu
//           isMenuExpanded={result.current[0]}
//           setMenuExpanded={result.current[1]}
//         />
//       );
//     });
//     expect(getComputedStyle(screen.getByTestId("menu")).left).toBe("-100%");
//   });

//   test("Test Menu show and hide", async () => {
//     const { result } = renderHook(() => {
//       const [isMenuExpanded, setMenuExpanded] = useState<Boolean>(true);
//       return { isMenuExpanded, setMenuExpanded };
//     });
//     let component: any;
//     await act(async () => {
//       component = render(
//         <Menu
//           isMenuExpanded={result.current.isMenuExpanded}
//           setMenuExpanded={result.current.setMenuExpanded}
//         />
//       );
//     });

//     expect(getComputedStyle(component.getByTestId("menu")).left).toBe("0px");

//     await act(async () => {
//       fireEvent.click(component.getByTestId("menu-button"));
//     });

//     cleanup();

//     await act(async () => {
//       component = render(
//         <Menu
//           isMenuExpanded={result.current.isMenuExpanded}
//           setMenuExpanded={result.current.setMenuExpanded}
//         />
//       );
//     });
//     await waitFor(() => {
//       expect(getComputedStyle(component.getByTestId("menu")).left).toBe(
//         "-100%"
//       );
//     });
//   });
// });
