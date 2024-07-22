import { component$, useTask$ } from '@builder.io/qwik';

export const List = component$(() => {

    return (
        <section id="list" class="container">
            <div class="wrapper">
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
                    <tbody>
                        <tr>
                            <td data-cell="matricule">140126-G2145</td>
                            <td data-cell="option">C</td>
                            <td data-cell="name">RABEMANANJARY Jean Boto</td>
                            <td data-cell="cisco">MANAKARA</td>
                            <td data-cell="studied_at">Ecole Privée catholique saint vincent de paul</td>
                            <td data-cell="observation" data-result="Admis"><p>Admis</p></td>
                            <td data-cell="mention" data-mention="Très bien"><p>Très bien</p></td>
                        </tr>
                        <tr>
                            <td data-cell="matricule">140126-G2145</td>
                            <td data-cell="option">C</td>
                            <td data-cell="name">RABEMANANJARY Jean Boto</td>
                            <td data-cell="cisco">MANAKARA</td>
                            <td data-cell="studied_at">Ecole Privée catholique saint vincent de paul</td>
                            <td data-cell="observation" data-result="Admis"><p>Admis</p></td>
                            <td data-cell="mention" data-mention="Bien"><p>Bien</p></td>
                        </tr>
                        <tr>
                            <td data-cell="matricule">140126-G2145</td>
                            <td data-cell="option">C</td>
                            <td data-cell="name">RABEMANANJARY Jean Boto</td>
                            <td data-cell="cisco">MANAKARA</td>
                            <td data-cell="studied_at">Ecole Privée catholique saint vincent de paul</td>
                            <td data-cell="observation" data-result="Admis"><p>Admis</p></td>
                            <td data-cell="mention" data-mention="Assez bien"><p>Assez bien</p></td>
                        </tr>
                        <tr>
                            <td data-cell="matricule">140126-G2145</td>
                            <td data-cell="option">C</td>
                            <td data-cell="name">RABEMANANJARY Jean Boto</td>
                            <td data-cell="cisco">MANAKARA</td>
                            <td data-cell="studied_at">Ecole Privée catholique saint vincent de paul</td>
                            <td data-cell="observation" data-result="Admis"><p>Admis</p></td>
                            <td data-cell="mention" data-mention="Passable"><p>Passable</p></td>
                        </tr>
                        <tr>
                            <td data-cell="matricule">140126-G2145</td>
                            <td data-cell="option">C</td>
                            <td data-cell="name">RABEMANANJARY Jean Boto</td>
                            <td data-cell="cisco">MANAKARA</td>
                            <td data-cell="studied_at">Ecole Privée catholique saint vincent de paul</td>
                            <td data-cell="observation" data-result="Non admis"><p>Non admis</p></td>
                            <td data-cell="mention" data-mention=""><p></p></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <div class="table">
                <div class="col-names">
                    <div><p>Matricule</p></div>
                    <div><p>Option/Serie</p></div>
                    <div><p>Nom et Prénoms</p></div>
                    <div><p>CISCO</p></div>
                    <div><p>Ecole d'origine</p></div>
                    <div><p>Observation</p></div>
                    <div><p>Mention</p></div>
                </div>
                <div class="list">
                    <div><p>140126-G2145</p></div>
                    <div><p>C</p></div>
                    <div><p>RABEMANANJARY Jean Boto</p></div>
                    <div><p>MANAKARA</p></div>
                    <div><p>Ecole Privée catholique saint vincent de paul</p></div>
                    <div class="result"><p>Admis</p></div>
                    <div class="mention"><p>Passable</p></div>
                </div>
            </div> */}
        </section>
    );
});
