import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RequestForm from "../components/home/RequestForm";
import { AppContextProvider } from "./AppContextMocked";
import nock from "nock";

const PDB_IDS = [
    { pdb: "2HY9", models_no: "10" },
    { pdb: "1d59", models_no: "1" },
    { pdb: "6rs3", models_no: "10" },
    { pdb: "1jjp", models_no: "8" },
    { pdb: "6fc9", models_no: "10" },
];

describe("Test RequestForm.tsx", () => {
    jest.setTimeout(20000);
    afterEach(cleanup);
    beforeAll(() => {
        act(() => {
            Object.defineProperty(window, "matchMedia", {
                writable: true,
                value: jest.fn().mockImplementation((query: any) => ({
                    matches: false,
                    addListener: jest.fn(), // deprecated
                    removeListener: jest.fn(), // deprecated
                })),
            });
        });
    });

    test("Test default Home render", async () => {
        await act(async () => {
            render(
                <AppContextProvider>
                    <RequestForm />
                </AppContextProvider>
            );
        });
        expect(screen.queryByTestId("model-selector-slider")).not.toBeNull();
    });
    test.each(PDB_IDS)(
        "Test request form with PDB: %s",
        async (entry: { pdb: string; models_no: string }) => {
            await act(async () => {
                render(
                    <AppContextProvider>
                        <RequestForm />
                    </AppContextProvider>
                );
            });
            const pdbIdInput = screen.getByTestId("rcsb-pdb-id-input");
            fireEvent.change(pdbIdInput, { target: { value: entry.pdb } });

            const result = await screen.findByTestId(
                "model-selector-slider",
                undefined,
                { timeout: 10000 }
            );
            await waitFor(() => {
                expect(result).toHaveProperty("max", entry.models_no);
            })
        }
    );
    test("Test when file is uploaded then rcsb input is disabled", async () => {
        let component: any;

        await act(async () => {
            component = render(
                <AppContextProvider>
                    <RequestForm />
                </AppContextProvider>
            );
        });

        nock("http://127.0.0.1")
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .get("/api/upload/structure/")
            .reply(200, {
                id: 1,
                models: 1,
                error: "",
            });

        const pdbIdInput = screen.getByTestId("rcsb-pdb-id-input");
        await act(async () => {
            fireEvent.change(pdbIdInput, { target: { value: "1d59" } });
        });
        await screen.findByTestId("model-selector-slider", undefined, {
            timeout: 10000,
        });
        const file = new File([""], "xyz.pdb", { type: "chemical/x-pdb" });
        const hiddenFileInput = document.querySelector(
            'input[type="file"]'
        ) as Element;
        expect(pdbIdInput).toHaveProperty("disabled", false);
        await act(async () => {
            fireEvent.change(hiddenFileInput, { target: { files: [file] } });
        });
        waitFor(() => {
            expect(pdbIdInput).toHaveProperty("disabled", true);
        });

        expect(pdbIdInput).toHaveProperty("value", "");
        expect(component.getAllByText("xyz.pdb")).toHaveLength(1);
    });

    test("Test when wrong file is uploaded then fileList is empty and rcsb input is enabled", async () => {
        let component: any;

        await act(async () => {
            component = render(
                <AppContextProvider>
                    <RequestForm />
                </AppContextProvider>
            );
        });

        nock("http://127.0.0.1")
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .get("/api/upload/structure/")
            .reply(200, {
                id: 1,
                models: 1,
                error: "",
            });

        const pdbIdInput = screen.getByTestId("rcsb-pdb-id-input");
        const file = new File([""], "xyz.pdf");
        const hiddenFileInput = document.querySelector(
            'input[type="file"]'
        ) as Element;
        expect(pdbIdInput).toHaveProperty("disabled", false);
        await act(async () => {
            fireEvent.change(hiddenFileInput, { target: { files: [file] } });
        });
        expect(pdbIdInput).toHaveProperty("disabled", false);
        expect(component.queryByText("xyz.pdf")).toBeNull();
    });
});
