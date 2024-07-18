import { component$ } from '@builder.io/qwik';

export const Search = component$(() => {
    return (
        <section id="search" class="container">
            <div class="exam-center">
                <h5>Centre d'examens</h5>
            </div>
            <div class="search">
                <h5>Chercher</h5>
                <div class="input">
                    <input type="text" placeholder="Taper votre matricule ou votre nom ici"/>
                    <button>search</button>
                </div>
            </div>
        </section>
    )
});