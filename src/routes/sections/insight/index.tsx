import { component$, useStore, $, useTask$ } from '@builder.io/qwik';
import tablesInfo from '~/data/tables_info.json';
import { supabase } from '~/config/supabaseClient';

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
  tableName: string;
  participantCount: number;
  tableData: Record<string, number>;
}

export const Insight = component$(() => {
  const store = useStore<Store>({
    selectedExamType: '',
    selectedYear: '',
    selectedCisco: '',
    examYears: [],
    examCiscos: [],
    tableName: '',
    participantCount: 0,
    tableData: {}
  });

  // Fetch participant counts for all tables
  useTask$(() => {
    const fetchCounts = async () => {
      const tableNames = [...new Set(tablesInfo.tables.map((table: TableInfo) => table.table_name))];

      const counts = await Promise.all(
        tableNames.map(async (tableName) => {
          const { count, error } = await supabase
            .from(tableName)
            .select('*', { count: 'exact' });

          if (error) {
            console.error(`Error fetching data for ${tableName}:`, error);
            return { tableName, count: 0 };
          }
          return { tableName, count: count ?? 0 };
        })
      );

      counts.forEach(({ tableName, count }) => {
        store.tableData[tableName] = count;
      });
    };

    fetchCounts();
  });

  // Fetch participant count for the selected table
  useTask$(({ track }) => {
    track(() => store.tableName);
    const fetchParticipantCount = async () => {
      if (store.tableName) {
        const { count, error } = await supabase
          .from(store.tableName)
          .select('*', { count: 'exact' });

        if (error) {
          console.error(`Error fetching data for ${store.tableName}:`, error);
          store.participantCount = 0;
        } else {
          store.participantCount = count ?? 0;
        }
      } else {
        store.participantCount = 0;
      }
    };

    fetchParticipantCount();
  });

  // Update table name based on selected filters
  const updateTableName = $(() => {
    const table = tablesInfo.tables.find(
      (t: TableInfo) =>
        t.exam_type === store.selectedExamType &&
        t.year === Number(store.selectedYear) &&
        t.cisco === store.selectedCisco
    );

    store.tableName = table ? table.table_name : '';
  });

  // Handlers for filter changes
  const handleExamTypeChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    store.selectedExamType = target.value;
    store.selectedYear = '';
    store.selectedCisco = '';
    store.examYears = [...new Set(
      tablesInfo.tables.filter((table: TableInfo) => table.exam_type === store.selectedExamType)
        .map((table: TableInfo) => table.year)
    )];
    store.examCiscos = [];
    updateTableName();
  });

  const handleYearChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    store.selectedYear = target.value;
    store.examCiscos = [...new Set(
      tablesInfo.tables.filter((table: TableInfo) =>
        table.exam_type === store.selectedExamType && table.year === Number(store.selectedYear)
      ).map((table: TableInfo) => table.cisco)
    )];
    store.selectedCisco = '';
    updateTableName();
  });

  const handleCiscoChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    store.selectedCisco = target.value;
    updateTableName();
  });

  return (
    <section id="insight" class="container">
      <div class="exam-type">
        <h5>Examen</h5>
        {tablesInfo.tables.length > 0 ? 
          [...new Set(tablesInfo.tables.map((table: TableInfo) => table.exam_type))].map(type => (
            <div key={type}>
              <input type="radio" name="exam-type" id={type} value={type} onChange$={handleExamTypeChange} />
              <label for={type}>{type}</label>
            </div>
          )) 
          : <p>No exam types available</p>
        }
      </div>

      <div class="exam-year">
        <h5>Année</h5>
        {store.selectedExamType ? 
          store.examYears.map(year => (
            <div key={year}>
              <input type="radio" name="exam-year" id={`year-${year}`} value={year.toString()} onChange$={handleYearChange} />
              <label for={`year-${year}`}>{year}</label>
            </div>
          )) 
          : <p>Select an exam type first</p>
        }
      </div>

      <div class="exam-center">
        <h5>Centre d'examen</h5>
        {store.selectedYear ? 
          store.examCiscos.map(cisco => (
            <div key={cisco}>
              <input type="radio" name="exam-center" id={cisco} value={cisco} onChange$={handleCiscoChange} />
              <label for={cisco}>{cisco}</label>
            </div>
          )) 
          : <p>Select a year first</p>
        }
      </div>

      <div class="exam-participant-current">
        <h5>Nombre d'inscrit</h5>
        <h3>{store.participantCount}</h3>
      </div>

      <div class="table-name">
        <h1>{store.tableName}</h1>
      </div>
    </section>
  );
});
