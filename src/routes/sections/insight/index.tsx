import { component$ } from '@builder.io/qwik';

export const Insight = component$(() => {
  return (
    <section id="insight" class="container">
        <div class="exam">
            <h5>Centre d'examen</h5>
            <h3>MANAKARA</h3>
        </div>
        <div class="exam">
            <h5>Examen</h5>
            <h3>BEPC</h3>
        </div>
        <div class="exam">
            <h5>Année</h5>
            <h3>2024</h3>
        </div>
        <div class="exam">
            <h5>Nombre d'inscrit</h5>
            <h3>700</h3>
        </div>
        <div class="exam">
            <h5>Taux de réussite</h5>
            <h3>14%</h3>
        </div>
    </section>
)
});