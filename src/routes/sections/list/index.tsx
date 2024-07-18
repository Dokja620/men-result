import { component$ } from '@builder.io/qwik';

export const List = component$(() => {
    return (
        <section id="list" class="container">
            <h2>list of children</h2>
            <div class="table">
                <div class="col-names">
                    <div><p>Matricule</p></div>
                    <div><p>Nom et Prénoms</p></div>
                    <div><p>CISCO</p></div>
                    <div><p>Ecole d'origine</p></div>
                    <div><p>Observation</p></div>
                </div>
                <div class="list">
                    <div><p>140126-G2145</p></div>
                    <div><p>RABEMANANJARY Jean Boto</p></div>
                    <div><p>MANAKARA</p></div>
                    <div><p>Ecole Privée catholique saint vincent de paul</p></div>
                    <div><p>Admis</p></div>
                </div>
                <div class="list">
                    <div><p>140126-G2145</p></div>
                    <div><p>RABEMANANJARY Jean Boto</p></div>
                    <div><p>MANAKARA</p></div>
                    <div><p>Ecole Privée catholique saint vincent de paul</p></div>
                    <div><p>Admis</p></div>
                </div>
                <div class="list">
                    <div><p>140126-G2145</p></div>
                    <div><p>RABEMANANJARY Jean Boto</p></div>
                    <div><p>MANAKARA</p></div>
                    <div><p>Ecole Privée catholique saint vincent de paul</p></div>
                    <div><p>Admis</p></div>
                </div>
                <div class="list">
                    <div><p>140126-G2145</p></div>
                    <div><p>RABEMANANJARY Jean Boto</p></div>
                    <div><p>MANAKARA</p></div>
                    <div><p>Ecole Privée catholique saint vincent de paul</p></div>
                    <div><p>Admis</p></div>
                </div>
            </div>
        </section>
    )
});