import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Home } from "../components/home/Home";

const PDB_IDS = [
  { pdb: "2HY9", models_no: "10" },
  { pdb: "1d59", models_no: "1" },
  { pdb: "6rs3", models_no: "10" },
  { pdb: "1jjp", models_no: "8" },
  { pdb: "6fc9", models_no: "10" },
];

describe("Test Home.tsx", () => {
  jest.setTimeout(100000);
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  test("Test default Home render", () => {
    render(<Home />);

    expect(screen.getByTestId("send-request-button")).toHaveProperty(
      "disabled"
    );

    expect(screen.queryByTestId("model-selector-slider")).toBeNull();
  });
  test.each(PDB_IDS)(
    "Test request form with PDB: %s",
    async (entry: { pdb: string; models_no: string }) => {
      await act(async () => {
        render(<Home />);
        const pdbIdInput = screen.getByTestId("rcsb-pdb-id-input");

        //userEvent.type(pdbIdInput, entry.pdb);
        //userEvent.click(pdbIdInput);
        fireEvent.change(pdbIdInput, { target: { value: entry.pdb } });
        //fireEvent.blur(pdbIdInput);

        //.toHaveProperty("value", entry.models_no);
        //console.log(nameWrapper);
      });

      //const cos = await screen.findByTestId("waiting-for-server-p", undefined, {
      //timeout: 10000,
      //});

      const cos2 = await screen.findByTestId(
        "model-selector-slider",
        undefined,
        { timeout: 10000 }
      );
      expect(cos2).toHaveProperty("max", entry.models_no);

      //expect(screen.getbytestid("model-selector-slider"))
      //toHaveProperty("value", entry.models_no);
    }
  );
});
