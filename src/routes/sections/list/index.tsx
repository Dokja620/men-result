import { component$, useStore, $, useTask$, useComputed$, useSignal, Signal } from '@builder.io/qwik';
import { supabase } from '~/config/supabaseClient';

interface ListProps {
    tableName: string;
}

interface Store {
    data: any[];
    filteredData: any[];
    loading: boolean;
    error: string | null;
    searchBy: Signal<string>;
    searchInp: Signal<string>;
    pageNo: Signal<number>;
    postPerPage: Signal<number>;
}

export const List = component$<ListProps>(({ tableName }) => {
    const store = useStore<Store>({
        data: [],
        filteredData: [],
        loading: false,
        error: null,
        searchBy: useSignal('matricule'), // Default search by 'matricule'
        searchInp: useSignal(''),
        pageNo: useSignal(0), // Pagination
        postPerPage: useSignal(50), // Number of posts per page
    });

    const fetchData = $(async () => {
        if (tableName && tableName !== 'No matching table found') {
            store.loading = true;
            store.error = null;
            try {
                const { data, error } = await supabase.from(tableName).select('*');
                if (error) {
                    console.error('Error fetching data:', error);
                    store.error = 'Error fetching data';
                } else {
                    store.data = data ?? [];
                    store.filteredData = data ?? [];
                }
            } catch (err) {
                console.error('Unexpected error fetching data:', err);
                store.error = 'Unexpected error fetching data';
            } finally {
                store.loading = false;
            }
        }
    });

    const handleSearch = $(() => {
        const query = store.searchInp.value.toLowerCase().trim();
        const key = store.searchBy.value;

        store.filteredData = store.data.filter((row) =>
            row[key]?.toString().toLowerCase().includes(query)
        );

        if (query === '') {
            store.filteredData = store.data; // Show all data if the query is empty
        }
    });

    useTask$(({ track }) => {
        track(() => tableName);
        fetchData();
    });

    useTask$(({ track }) => {
        track(() => store.searchBy.value);
        track(() => store.searchInp.value);
        handleSearch();
    });

    const computedPosts = useComputed$(() => {
        return store.filteredData.slice(
            store.pageNo.value * store.postPerPage.value,
            store.pageNo.value * store.postPerPage.value + store.postPerPage.value
        );
    });

    return (
        <section id="list" class="container">
            <div class='search-cont'>
                <select onInput$={(e: any) => store.searchBy.value = e.target.value}>
                    <option value="matricule">Matricule</option>
                    <option value="name">Nom</option>
                    {/* Add other headers as needed */}
                </select>
                <input
                    class='search-inp'
                    placeholder='Taper votre Nom / Matricule'
                    onInput$={(e: any) => store.searchInp.value = e.target.value}
                />
            </div>
            <div class="tables">
                {store.loading && <p>Chargement...</p>}
                {store.error && <p>{store.error}</p>}
                {!store.loading && !store.error && computedPosts.value.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Matricule</th>
                                <th>Option/Serie</th>
                                <th>Nom et Prénoms</th>
                                <th>CISCO</th>
                                <th>Ecole d'origine</th>
                                <th>Observation</th>
                                <th>Mention</th>
                            </tr>
                        </thead>
                        <TableBody
                            data={computedPosts.value}
                            pageNo={store.pageNo}
                            postPerPage={store.postPerPage}
                        />
                    </table>
                )}
                {!store.loading && !store.error && computedPosts.value.length === 0 && <p class="missing">Donnée non trouvée <br /> Essayer de remplir le filtre</p>}
                {!store.loading && !store.error && computedPosts.value.length > 0 && (
                    <Pagination
                        pageNo={store.pageNo}
                        totalPages={Math.ceil(store.filteredData.length / store.postPerPage.value)}
                    />
                )}
            </div>
        </section>
    );
});

interface TableBodyProps {
    data: any[];
    pageNo: Signal<number>;
    postPerPage: Signal<number>;
}

const columnMapping: { [key: string]: string } = {
    matricule: 'Matricule',
    option: 'Option',
    name: 'Nom et prénoms',
    cisco: 'CISCO',
    studied_at: 'École d\'origine',
    observation: 'Observation',
    mention: 'Mention',
};

const TableBody = component$(({ data, pageNo, postPerPage }: TableBodyProps) => {
    return (
        <tbody>
            {data.map((row, index) => (
                <tr key={index} class="reall-table">
                    {Object.keys(columnMapping).map((key, i) => (
                        <td
                            key={i}
                            data-cell={columnMapping[key]}
                            data-result={key === 'observation' ? row[key] : undefined}
                            data-mention={key === 'mention' ? row[key] : undefined}
                        >
                            {key === 'observation' || key === 'mention' ? (
                                <p>{row[key]}</p>
                            ) : (
                                row[key]
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
});

interface PaginationProps {
    pageNo: Signal<number>;
    totalPages: number;
}

const Pagination = component$(({ pageNo, totalPages }: PaginationProps) => {
    const goToPage = $((page: number) => {
        pageNo.value = page;
    });

    return (
        <div class="pagination">
            <button
                onClick$={() => goToPage(Math.max(pageNo.value - 1, 0))}
                disabled={pageNo.value === 0}
            >
                Précedent
            </button>
            <h3>
                {pageNo.value + 1}/{totalPages}
            </h3>
            <button
                onClick$={() => goToPage(Math.min(pageNo.value + 1, totalPages - 1))}
                disabled={pageNo.value === totalPages - 1}
            >
                Suivant
            </button>
        </div>
    );
});
