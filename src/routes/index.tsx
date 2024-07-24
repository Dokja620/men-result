import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Insight } from "./sections/insight";
// import { Search } from "./sections/search";
// import { List } from "./sections/list";
import { Hero } from "./sections/hero";

export default component$(() => {
    return (
        <>
            <Hero/>
            <Insight />
            {/* <Search/> */}
            {/* <List/> */}
        </>
    );
});

export const head: DocumentHead = {
    title: "MESUPRES | Résultat aux Examens Officiels",
    meta: [
        {
            name: "description",
            content: "Résultat aux Examens Officiels BAC",
        },
    ],
};
