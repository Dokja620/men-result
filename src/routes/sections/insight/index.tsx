import { component$ } from '@builder.io/qwik';

export const Insight = component$(() => {
  return (
    <section id="insight" class="container">
        <div class="exam">
            <h4>Examen</h4>
            <h1>BEPC</h1>
        </div>
        <div class="exam">
            <h4>Année</h4>
            <h1>2024</h1>
        </div>
        <div class="exam">
            <h4>Nombre d'inscrit</h4>
            <h1>700</h1>
        </div>
        <div class="exam">
            <h4>Taux de réussite</h4>
            <h1>14%</h1>
        </div>
    </section>
)
});