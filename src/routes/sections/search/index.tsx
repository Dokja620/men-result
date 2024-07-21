import { component$ } from '@builder.io/qwik';

export const Search = component$(() => {
    return (
        <section id="search" class="container">
            <div class="search">
                <input type="search" name="" id="" placeholder="Tapez votre numéro matricule ou Votre nom complet"/>
                <button>Rechercher</button>
            </div>
        </section>
    )
});