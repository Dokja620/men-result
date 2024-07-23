// Insight.tsx (Parent Component)
import { component$, useStore, $, useTask$ } from '@builder.io/qwik';
import tablesInfo from '~/data/tables_info.json';
import { supabase } from '~/config/supabaseClient';
import { List } from '../list';

interface TableInfo {
  table_name: string;
  year: number;
  exam_type: string;
  cisco: string;
}

interface Store {
  selectedExamType: string;
  selectedYear: string;
  selectedCisco: string;
  examYears: number[];
  examCiscos: string[];
  participantCount: number;
  admisCount: number;
  nonAdmisCount: number;
  tableName: string;
}

export const Insight = component$(() => {
  const store = useStore<Store>({
    selectedExamType: '',
    selectedYear: '',
    selectedCisco: '',
    examYears: [],
    examCiscos: [],
    participantCount: 0,
    admisCount: 0,
    nonAdmisCount: 0,
    tableName: ''
  });

  const updateTableName = $(() => {
    const matchingTable = tablesInfo.tables.find((table: TableInfo) =>
      table.exam_type === store.selectedExamType &&
      table.year === Number(store.selectedYear) &&
      table.cisco === store.selectedCisco
    );

    store.tableName = matchingTable ? matchingTable.table_name : 'No matching table found';
  });

  const fetchParticipantCount = $(async () => {
    if (store.tableName && store.tableName !== 'No matching table found') {
      try {
        // Fetch participant count
        const { count, error } = await supabase
          .from(store.tableName)
          .select('*', { count: 'exact' });

        if (error) {
          console.error('Error fetching participant count:', error);
          store.participantCount = 0;
        } else {
          store.participantCount = count ?? 0;
        }
      } catch (err) {
        console.error('Unexpected error fetching participant count:', err);
        store.participantCount = 0;
      }
    }
  });

  const fetchObservations = $(async () => {
    if (store.tableName && store.tableName !== 'No matching table found') {
      try {
        // Fetch observations
        const { data: observations, error } = await supabase
          .from(store.tableName)
          .select('observation');
  
        if (error) {
          console.error('Error fetching observations:', error);
          store.admisCount = 0;
          store.nonAdmisCount = 0;
        } else {
          // Log observations
          console.log('Observations:', observations);
          
          // Process observations
          const lowerCaseObservations = observations.map((row: any) => row.observation.toLowerCase());
          store.admisCount = lowerCaseObservations.filter((obs: string) => obs === 'admis').length;
          store.nonAdmisCount = lowerCaseObservations.filter((obs: string) => obs === 'non admis').length;
        }
      } catch (err) {
        console.error('Unexpected error fetching observations:', err);
        store.admisCount = 0;
        store.nonAdmisCount = 0;
      }
    }
  });
  

  useTask$(({ track }) => {
    track(() => store.tableName);
    fetchParticipantCount().then(() => {
      fetchObservations();
    });
  });

  const handleExamTypeChange = $(async (event: Event) => {
    const target = event.target as HTMLSelectElement;
    store.selectedExamType = target.value;
    store.selectedYear = '';
    store.selectedCisco = '';
    store.examYears = [...new Set(
      tablesInfo.tables
        .filter((table: TableInfo) => table.exam_type === store.selectedExamType)
        .map((table: TableInfo) => table.year)
    )];
    store.examCiscos = [];
    store.participantCount = 0;
    store.admisCount = 0;
    store.nonAdmisCount = 0;
    updateTableName();
  });

  const handleYearChange = $(async (event: Event) => {
    const target = event.target as HTMLSelectElement;
    store.selectedYear = target.value;
    store.examCiscos = [...new Set(
      tablesInfo.tables
        .filter((table: TableInfo) => 
          table.exam_type === store.selectedExamType && 
          table.year === Number(store.selectedYear)
        )
        .map((table: TableInfo) => table.cisco)
    )];
    store.selectedCisco = '';
    store.participantCount = 0;
    store.admisCount = 0;
    store.nonAdmisCount = 0;
    updateTableName();
  });

  const handleCiscoChange = $(async (event: Event) => {
    const target = event.target as HTMLSelectElement;
    store.selectedCisco = target.value;
    updateTableName();
  });

  return (
    <>
        <section id="insight" class="container">
            <div class="exam-type">
                <h5>Examen</h5>
                <select onChange$={handleExamTypeChange}>
                <option value="" disabled selected>_ _ _</option>
                {tablesInfo.tables.length > 0 ? 
                    [...new Set(tablesInfo.tables.map((table: TableInfo) => table.exam_type))].map(type => (
                    <option key={type} value={type}>{type}</option>
                    )) 
                    : <option>No exam types available</option>
                }
                </select>
            </div>

            <div class="exam-year">
                <h5>Année</h5>
                <select onChange$={handleYearChange} disabled={!store.selectedExamType}>
                    <option value="" disabled selected>_ _ _</option>
                    {store.examYears.map(year => (
                        <option key={year} value={year.toString()}>{year.toString()}</option>
                    ))}
                </select>
            </div>


            <div class="exam-center">
                <h5>Centre d'examen</h5>
                <select onChange$={handleCiscoChange} disabled={!store.selectedYear}>
                <option value="" disabled selected>_ _ _</option>
                {store.examCiscos.map(cisco => (
                    <option key={cisco} value={cisco}>{cisco}</option>
                ))}
                </select>
            </div>

            <div class="exam-participant-current">
                <h5>Nombre d'inscrit</h5>
                <h3>{store.participantCount}</h3>
            </div>

            {/* Pass the tableName to the List component */}
        </section>
        <List tableName={store.tableName} />
    </>
  );
});